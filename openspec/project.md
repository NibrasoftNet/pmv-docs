# Project Context

## Purpose

A modern full-stack monorepo designed for managing automotive aftermarket data (likely following TecDoc standards). It features a type-safe architecture using oRPC for communication between a Next.js frontend and a NestJS backend. The system handles complex domain entities like Manufacturers, Articles, OEM/IAM references, and Vehicle Models.

## Tech Stack

- **Monorepo Management**: Turborepo, pnpm
- **Frontend**: Next.js 16 (App Router), React 19.2, Tailwind CSS 4, shadcn/ui, oRPC Client
- **Backend**: NestJS 11, TypeORM, PostgreSQL, oRPC Server, Better Auth, MinIO (Object Storage), Nodemailer
- **Shared**: Zod (Validation), oRPC (Contracts), TypeScript
- **Languages**: TypeScript

## Project Conventions

### Code Style

- **Formatting**: Prettier (shared config `@workspace/prettier-config`)
- **Linting**: ESLint (shared config `@workspace/eslint-config`)
- **Type Safety**: Strict TypeScript configuration, Zod for runtime validation
- **Naming**: Standard JS/TS conventions (camelCase for variables/functions, PascalCase for classes/components)

### Architecture Patterns

- **Contract-First Development**: API contracts are defined in `packages/orpc` using Zod and oRPC before implementation.
- **Backend**: Modular NestJS architecture. Each domain entity (e.g., `Manufacturer`, `Engine`, `Article`) has its own module.
- **Frontend**: Next.js App Router with Server Components.
- **Database**: TypeORM for ORM, likely using Data Mapper pattern (Repositories).
- **Authentication**: Better Auth integration.

### Testing Strategy

- **Backend**: Jest for unit and integration testing (`.spec.ts` files).
- **E2E**: Jest configured for E2E testing (`test/jest-e2e.json` in backend).

### Git Workflow

- Standard Feature Branch Workflow (implied).
- Conventional Commits (recommended for monorepos).

## Domain Context

- **Automotive Aftermarket**: The system deals with parts and vehicle data.
- **Key Acronyms**:
  - **IAM**: Independent Aftermarket
  - **OEM**: Original Equipment Manufacturer
  - **EAN**: European Article Number
  - **PMV**: Likely Parts, Manufacturers, Vehicles (or similar domain grouping)
- **Data Structure**: Complex relationships between Articles, Manufacturers, Models, SubModels, and Engines.
- **TecDoc**: The system appears to process or manage data compatible with the TecDoc format.

## Important Constraints

- **Node Version**: >= 20
- **Package Manager**: pnpm 10.4.1+
- **Environment**: Requires `.env.local` for configuration.

## External Dependencies

- **Database**: PostgreSQL
- **Storage**: MinIO (S3 compatible)
- **Email**: SMTP Server (via Nodemailer)
