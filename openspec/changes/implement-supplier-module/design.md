# Design: Implement Supplier Module

## Overview
The supplier module will expose a paginated list of suppliers via ORPC. The backend will handle database queries, and the frontend will display the data using a new page.

## Architecture

### Backend
- **Service**: Update `SupplierService` to fetch paginated suppliers from the database.
- **Controller**: Update `SupplierController` to handle the request.
- **ORPC**: Define a `list` procedure in `supplier.contract.ts` using `zod` schemas.

### Shared (ORPC Package)
- **Schema**: Define `SupplierSchema` and `PaginationSchema`.
- **Contract**: Create `supplier.contract.ts` with `list` procedure.

### Frontend (Web)
- **Page**: `apps/web/app/suppliers/page.tsx` will use the ORPC client to fetch data.
- **Components**: Use existing UI components (table, pagination) to display the list.

## Data Model
- **Supplier**: `id`, `name`, `matchCode`, `description`, `image`, `address`.

## API Interface
- `supplier.list`:
  - Input: `{ page: number, limit: number, query?: string }`
  - Output: `{ data: Supplier[], meta: { total: number, page: number, lastPage: number } }`
