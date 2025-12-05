# CI/CD and Git Workflow Protection

This document explains the CI/CD setup and git workflow protections in place for the PMV Docs monorepo.

## GitHub Actions CI Workflow

### Overview

The `.github/workflows/docker-e2e.yml` workflow ensures that the entire monorepo builds and runs successfully in a CI environment.

### Triggers

The workflow runs on:

- **Push to `main` branch**: Validates that the main branch is always in a working state
- **Pull Requests to `main`**: Ensures PRs don't break the build before merging

### Workflow Steps

1. **Checkout Code**: Uses `actions/checkout@v4` to clone the repository
2. **Docker Setup**: Verifies Docker and Docker Compose are available
3. **Environment Setup**: Copies `env.example` to `.env` for CI environment
4. **Build & Start Services**:
   - Builds all Docker images using `docker-compose.ci.yml`
   - Starts all services (postgres, adminer, maildev, monorepo)
5. **Health Check**:
   - Waits for the `pmv-monorepo` container to become healthy
   - Checks every 5 seconds for up to 50 seconds
   - Logs container output if health check fails
6. **Cleanup**: Stops and removes all containers

### Success Criteria

The CI passes when:

- ✅ All Docker images build successfully
- ✅ All services start without errors
- ✅ The monorepo container passes its health check (backend responds on port 5010)

## Git Workflow Protection with Husky

### Pre-Commit Hook (`.husky/pre-commit`)

**Purpose**: Ensure code quality before commits

**Actions**:

1. Warns if committing directly to `main` branch
2. Runs linting (`npm run lint`)

**Behavior**:

- ⚠️ **Warning only** for commits to main (doesn't block)
- ❌ **Blocks commit** if linting fails

### Pre-Push Hook (`.husky/pre-push`)

**Purpose**: Prevent direct pushes to the `main` branch

**Actions**:

1. Detects the current branch
2. Blocks push if the branch is `main`

**Behavior**:

- ❌ **Blocks push** to main branch
- ✅ **Allows push** to all other branches
- Provides helpful error message with instructions

### Recommended Workflow

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit**:

   ```bash
   git add .
   git commit -m "Your commit message"
   # Pre-commit hook runs linting
   ```

3. **Push to your feature branch**:

   ```bash
   git push origin feature/your-feature-name
   # Pre-push hook allows this
   ```

4. **Create a Pull Request**:
   - Go to GitHub
   - Create a PR from your feature branch to `main`
   - CI will automatically run
   - Wait for CI to pass and get code review

5. **Merge via GitHub**:
   - Use GitHub's merge button to merge to main
   - This bypasses the local pre-push hook (which is intended)

## Docker Compose CI Configuration

### Services

The `docker-compose.ci.yml` includes:

1. **postgres**: PostgreSQL database with PostGIS extension
   - Health check: `pg_isready`
   - Data persisted to `./deployment/pmv-db`

2. **adminer**: Database management UI
   - Accessible on configured port

3. **maildev**: Email testing server
   - SMTP server on port 1025
   - Web UI on port 1080

4. **monorepo**: Combined backend + web application
   - Backend on port 5010
   - Web on port 4010
   - Health check: Backend API health endpoint
   - Depends on postgres and maildev

### Health Checks

All critical services have health checks:

- **postgres**: Checks database is ready
- **monorepo**: Checks backend API is responding

The CI workflow waits for all health checks to pass before considering the build successful.

## Bypassing Protections (Emergency Only)

### If you absolutely must push directly to main:

```bash
# Skip pre-push hook (NOT RECOMMENDED)
git push --no-verify origin main
```

⚠️ **Warning**: This should only be used in emergencies. The CI will still run on GitHub and may fail if the build is broken.

## Troubleshooting

### CI Fails on GitHub

1. Check the GitHub Actions tab for detailed logs
2. Run locally to reproduce:
   ```bash
   cp env.example .env
   docker compose -f docker-compose.ci.yml up --build
   ```
3. Check container logs:
   ```bash
   docker compose -f docker-compose.ci.yml logs monorepo
   ```

### Pre-Push Hook Blocks Legitimate Push

If you're on a feature branch and the hook blocks you:

1. Check your current branch: `git branch --show-current`
2. If you're accidentally on main, create a feature branch:
   ```bash
   git checkout -b feature/my-feature
   git push origin feature/my-feature
   ```

### Linting Fails on Commit

1. Run linting manually: `npm run lint`
2. Fix the errors
3. Commit again

## Environment Variables

The CI uses `env.example` as a template. Ensure this file is always up-to-date with all required variables for the application to run.

Required variables include:

- Database configuration (DATABASE\_\*)
- MinIO configuration (MINIO\_\*)
- Mail configuration (MAIL\_\*)
- Application URLs (APP_URL, API_URL)
- OAuth credentials (GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET)

## Summary

✅ **CI ensures**: The monorepo builds and runs successfully
✅ **Pre-commit ensures**: Code is linted before committing
✅ **Pre-push ensures**: No direct pushes to main branch
✅ **Result**: A protected main branch with high code quality
