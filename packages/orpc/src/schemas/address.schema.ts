import { z } from 'zod';
import { CountrySchema } from './country.schema.js';

/**
 * Address schema with all fields
 */
export const AddressSchema = z.object({
  id: z.number().int().positive(),
  street: z.string().min(1, 'Street is required').max(200, 'Street too long'),
  city: z.string().min(1, 'City is required').max(200, 'City too long'),
  zip: z.string().min(1, 'Zip is required').max(200, 'Zip too long'),
  country: CountrySchema,
  longitude: z.number(),
  latitude: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional().nullable(),
});

/**
 * Schema for creating a new language (without id and createdAt)
 */
export const CreateAddressSchema = AddressSchema.omit({
  id: true,
  country: true,
  createdAt: true,
  deletedAt: true,
  updatedAt: true,
}).extend({ countryId: z.coerce.number().int().positive() });

/**
 * Schema for updating a language (all fields optional except id)
 */
export const UpdateAddressSchema = AddressSchema.partial().required({
  id: true,
});

/**
 * Schema for language ID parameter
 */
export const AddressIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * TypeScript types inferred from schemas
 */
export type AddressSchemaType = z.infer<typeof AddressSchema>;
export type CreateAddressSchemaType = z.infer<typeof CreateAddressSchema>;
export type UpdateAddressSchemaType = z.infer<typeof UpdateAddressSchema>;
export type AddressIdSchemaType = z.infer<typeof AddressIdSchema>;
