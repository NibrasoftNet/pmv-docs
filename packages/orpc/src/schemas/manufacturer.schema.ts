import { z } from 'zod';
import { FileSchema } from './file.schema.js';
import { CountrySchema } from './country.schema.js';
import { LanguageSchema } from './language.schema.js';

/**
 * Base manufacturer schema with all fields
 */
export const ManufacturerSchema = z.object({
  id: z.number().int().positive(),
  manufacturerId: z.number().int().positive(),
  name: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  isPassengerCar: z.boolean(),
  isCommercialVehicle: z.boolean(),
  isMotorbike: z.boolean(),
  isLCV: z.boolean(),
  isDriverCab: z.boolean(),
  isAxle: z.boolean(),
  isEngine: z.boolean(),
  isBus: z.boolean(),
  isAftermarket: z.boolean(),
  isTractor: z.boolean(),
  isVirtualOEM: z.boolean(),
  active: z.boolean(),
  websiteURL: z.string().url().nullable(),
  description: z.string().max(1000, 'Description too long').nullable(),
  image: FileSchema.nullable(),
  originCountry: CountrySchema,
  language: LanguageSchema,
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  deletedAt: z.union([z.date(), z.string()]).optional().nullable(),
});

/**
 * Schema for creating a new manufacturer (without id and createdAt)
 */
export const CreateManufacturerSchema = ManufacturerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

/**
 * Schema for updating a manufacturer (all fields optional except id)
 */
export const UpdateManufacturerSchema = ManufacturerSchema.partial().required({
  id: true,
});

/**
 * Schema for manufacturer ID parameter
 */
export const ManufacturerIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * TypeScript types inferred from schemas
 */
export type ManufacturerSchemaType = z.infer<typeof ManufacturerSchema>;
export type CreateManufacturerSchemaType = z.infer<
  typeof CreateManufacturerSchema
>;
export type UpdateManufacturerSchemaType = z.infer<
  typeof UpdateManufacturerSchema
>;
export type ManufacturerIdSchemaType = z.infer<typeof ManufacturerIdSchema>;
