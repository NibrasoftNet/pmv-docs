import { z } from 'zod';
import { AddressSchema } from './address.schema.js';
import { FileSchema } from './file.schema.js';

/**
 * Base supplier schema with all fields
 */
export const SupplierSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  matchCode: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').nullable(),
  websiteURL: z.string().url().nullable(),
  articlesCount: z.number().int().nonnegative(),
  address: AddressSchema.nullable(),
  image: FileSchema.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional().nullable(),
});

/**
 * Schema for creating a new supplier (without id and createdAt)
 */
export const CreateSupplierSchema = SupplierSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

/**
 * Schema for updating a supplier (all fields optional except id)
 */
export const UpdateSupplierSchema = SupplierSchema.partial().required({
  id: true,
});

/**
 * Schema for supplier ID parameter
 */
export const SupplierIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * TypeScript types inferred from schemas
 */
export type SupplierSchemaType = z.infer<typeof SupplierSchema>;
export type CreateSupplierSchemaType = z.infer<typeof CreateSupplierSchema>;
export type UpdateSupplierSchemaType = z.infer<typeof UpdateSupplierSchema>;
export type SupplierIdSchemaType = z.infer<typeof SupplierIdSchema>;
