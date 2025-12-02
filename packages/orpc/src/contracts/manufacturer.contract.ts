import { oc } from '@orpc/contract';
import { z } from 'zod';
import {
  CreateManufacturerSchema,
  ManufacturerIdSchema,
  ManufacturerSchema,
  UpdateManufacturerSchema,
} from '../schemas/manufacturer.schema.js';

/**
 * Todo API contracts with OpenAPI routes
 * Each contract defines HTTP method, path, input validation, and output type
 */
export const manufacturerContract = {
  /**
   * List all manufacturers
   * GET /v1/manufacturers
   */
  list: oc
    .route({
      method: 'GET',
      path: '/v1/manufacturers',
      summary: 'List all manufacturers',
      description: 'Retrieve all manufacturer items',
      tags: ['Manufacturers'],
    })
    .output(z.array(ManufacturerSchema)),

  /**
   * Get a single manufacturer by ID
   * GET /v1/manufacturers/{id}
   */
  get: oc
    .route({
      method: 'GET',
      path: '/v1/manufacturers/{id}',
      summary: 'Get manufacturer by ID',
      description: 'Retrieve a single manufacturer item by its ID',
      tags: ['Manufacturers'],
    })
    .input(ManufacturerIdSchema)
    .output(ManufacturerSchema),

  /**
   * Create a new manufacturer
   * POST /v1/manufacturers
   */
  create: oc
    .route({
      method: 'POST',
      path: '/v1/manufacturers',
      summary: 'Create manufacturer',
      description: 'Create a new manufacturer item',
      tags: ['Manufacturers'],
    })
    .input(CreateManufacturerSchema)
    .output(ManufacturerSchema),

  /**
   * Update an existing manufacturer
   * PUT /v1/manufacturers/{id}
   */
  update: oc
    .route({
      method: 'PUT',
      path: '/v1/manufacturers/{id}',
      summary: 'Update manufacturer',
      description: 'Update an existing manufacturer item',
      tags: ['Manufacturers'],
    })
    .input(UpdateManufacturerSchema)
    .output(ManufacturerSchema),

  /**
   * Delete a manufacturer by ID
   * DELETE /v1/manufacturers/{id}
   */
  delete: oc
    .route({
      method: 'DELETE',
      path: '/v1/manufacturers/{id}',
      summary: 'Delete manufacturer',
      description: 'Delete a manufacturer item by its ID',
      tags: ['Manufacturers'],
    })
    .input(ManufacturerIdSchema)
    .output(z.object({ success: z.boolean(), id: z.number() })),
};
