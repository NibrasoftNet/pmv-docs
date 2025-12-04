# Build stage for backend
FROM node:20-slim AS backend-builder

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_CONFIG_FETCH_RETRIES=10
ENV PNPM_CONFIG_FETCH_RETRY_MINTIMEOUT=10000
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate
RUN pnpm add -g turbo

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/web/package.json ./apps/web/
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/backend ./apps/backend
COPY turbo.json ./
COPY tsconfig.json ./

# Copy env file for build
# (env.example copy removed)

# Debug: Check if tsc is available
RUN which tsc || echo "tsc not in PATH" && ls -la node_modules/.bin/ | grep tsc || echo "tsc not in node_modules/.bin"

# build packages
RUN turbo build --filter=packages

# Build the backend
RUN turbo build --filter=backend

# Build stage for web
FROM node:20-slim AS web-builder

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_CONFIG_FETCH_RETRIES=10
ENV PNPM_CONFIG_FETCH_RETRY_MINTIMEOUT=10000
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate
RUN pnpm add -g turbo

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY apps/backend/package.json ./apps/backend/
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/web ./apps/web
COPY turbo.json ./
COPY tsconfig.json ./

# Build arguments for Next.js
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy env file for build
# (env.example copy removed)

# Create public directory if it doesn't exist (optional in Next.js)
RUN mkdir -p apps/web/public

# Build the web app
RUN turbo build --filter=web

# Production stage - Combined runner
FROM node:20-slim AS runner

# Install pnpm and set environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

# Install pm2 globally for process management
RUN pnpm add -g pm2

WORKDIR /app

# Create user for Next.js
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 --gid nodejs nextjs

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/web/package.json ./apps/web/
COPY packages ./packages

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built backend
COPY --from=backend-builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=backend-builder /app/apps/backend/src/database/migrations ./apps/backend/src/database/migrations
# Copy seed data files (CSV files needed by seed scripts) to dist folder where compiled code expects them
COPY --from=backend-builder /app/apps/backend/src/database/seeds ./apps/backend/dist/database/seeds

# Copy built web app
COPY --from=web-builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=web-builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=web-builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=web-builder /app/apps/web/next.config.mjs ./apps/web/

# Create PM2 ecosystem file
RUN echo '{\
  "apps": [\
    {\
      "name": "backend",\
      "script": "apps/backend/dist/main.js",\
      "env": {\
        "NODE_ENV": "production"\
      }\
    },\
    {\
      "name": "web",\
      "script": "apps/web/server.js",\
      "args": "",\
      "cwd": "/app",\
      "env": {\
        "NODE_ENV": "production",\
        "PORT": "4010",\
        "HOSTNAME": "0.0.0.0"\
      },\
      "user": "nextjs"\
    }\
  ]\
}' > ecosystem.config.json

# Set environment
ENV NODE_ENV=production

# Expose both ports
EXPOSE 5010 4010

# Start both applications with PM2
CMD ["pm2-runtime", "start", "ecosystem.config.json"]
