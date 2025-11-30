import { oc } from '@orpc/contract';
import { z } from 'zod';
import {
  CreateSupplierSchema,
  SupplierIdSchema,
  SupplierSchema,
  UpdateSupplierSchema,
} from '../schemas/supplier.schema.js';

/**
 * Todo API contracts with OpenAPI routes
 * Each contract defines HTTP method, path, input validation, and output type
 */
export const supplierContract = {
  /**
   * List all suppliers
   * GET /v1/suppliers
   */
  list: oc
    .route({
      method: 'GET',
      path: '/v1/suppliers',
      summary: 'List all suppliers',
      description: 'Retrieve all supplier items',
      tags: ['Suppliers'],
    })
    .output(z.array(SupplierSchema)),

  /**
   * Get a single supplier by ID
   * GET /v1/suppliers/{id}
   */
  get: oc
    .route({
      method: 'GET',
      path: '/v1/suppliers/{id}',
      summary: 'Get supplier by ID',
      description: 'Retrieve a single supplier item by its ID',
      tags: ['Suppliers'],
    })
    .input(SupplierIdSchema)
    .output(SupplierSchema),

  /**
   * Create a new supplier
   * POST /v1/suppliers
   */
  create: oc
    .route({
      method: 'POST',
      path: '/v1/suppliers',
      summary: 'Create supplier',
      description: 'Create a new supplier item',
      tags: ['Suppliers'],
    })
    .input(CreateSupplierSchema)
    .output(SupplierSchema),

  /**
   * Update an existing supplier
   * PUT /v1/suppliers/{id}
   */
  update: oc
    .route({
      method: 'PUT',
      path: '/v1/suppliers/{id}',
      summary: 'Update supplier',
      description: 'Update an existing supplier item',
      tags: ['Suppliers'],
    })
    .input(UpdateSupplierSchema)
    .output(SupplierSchema),

  /**
   * Delete a supplier by ID
   * DELETE /v1/suppliers/{id}
   */
  delete: oc
    .route({
      method: 'DELETE',
      path: '/v1/suppliers/{id}',
      summary: 'Delete supplier',
      description: 'Delete a supplier item by its ID',
      tags: ['Suppliers'],
    })
    .input(SupplierIdSchema)
    .output(z.object({ success: z.boolean(), id: z.number() })),
};
