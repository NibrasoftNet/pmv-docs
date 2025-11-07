# Installation

NestJS Boilerplate supports [TypeORM](https://www.npmjs.com/package/typeorm) for working with databases. By default, TypeORM uses [PostgreSQL](https://www.postgresql.org/) as the main database, but you can use any relational database.

---

## Table of Contents <!-- omit in toc -->

- [Backend (Nestjs + PostgreSQL + TypeORM)](#backend-nestjs--postgresql--typeorm)
- [Libraries (ORPC)](#libraries-orpc)
- [Frontend (Nextjs + TypeScript + TailwindCSS)](#frontend-nextjs--typescript--tailwindcss)

---

## Backend (Nestjs + PostgreSQL + TypeORM)

1. Clone repository and install dependencies

   ```bash
   git clone --depth 1 https://github.com/SofienRogue/nestjs-nextjs-orpc-turbo-boilerplate.git my-app
   cd my-app/
   pnpm install
   ```

2. Go to folder `apps/backend`, and copy `env.example` as `.env`.

   ```bash
   cd my-app/
   cp env.example .env
   ```

3. Run additional container:
   Go to folder `deployment`,

   ```bash
   docker compose -p turbo-cont --env-file ../apps/backend/.env up -d
   ```

4. Build backend

   ```bash
   pnpm build --filter=backend
   ```

5. Create migration (SQL version to run inside adminer)
   5.1 Generate SQL migration file
   ```bash
   pnpm run migration:sql
   ```
   5.2 New migration created in `apps/backend/src/migrations` with sql command <br>
   5.3 Copy sql command from new migration <br>
   5.4 Open adminer <http://localhost:8088>
   5.5 login with:
   - server: postgres:5432
   - user: root
   - password: secret
   - database: turbo_db
   5.6 Run sql command in adminer

6. Run app in dev mode

   ```bash
   cd apps/backend
   pnpm run start:dev
   ```

6. Open <http://localhost:5010>


## Links

- Open Scalar OpenApi docs <http://localhost:5010/api-docs>
- Adminer (client for DB): <http://localhost:8088>
- Maildev: <http://localhost:1080>

---

## Libraties (ORPC)

1. Build ORPC

   ```bash
   pnpm build --filter=orpc
   ```
## Web (Nextjs + TypeScript + TailwindCSS)

1. Go to folder `apps/web`, and copy `env.example` as `.env`.

   ```bash
   cd my-app/
   cp env.example .env
   ```

2. Run app in dev mode

   ```bash
   cd apps/web
   pnpm run start:dev
   ```

3. Open <http://localhost:3000>

---

Previous: [Introduction](../README.md)

Next: [Database](database.md)