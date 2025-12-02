import { z } from 'zod';
import { LanguageSchema } from './language.schema.js';

/**
 * Base Country schema with all fields
 */
export const CountrySchema = z.object({
  id: z.number().int().positive(),
  isoCode1: z.string().max(10, 'ISO code too long').optional(),
  currencyCode: z.string().max(10, 'Currency code too long').optional(),
  isGroup: z.boolean().optional(),
  isoCode2: z.string().max(10, 'ISO code too long').optional(),
  isoCode3: z.string().max(10, 'ISO code too long').optional(),
  isoCodeNo: z.number().int().positive().optional(),
  description: z
    .string()
    .max(1000, 'Description too long')
    .nullable()
    .optional(),
  language: LanguageSchema,
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  deletedAt: z.union([z.date(), z.string()]).optional().nullable(),
});

/**
 * Schema for creating a new Country (without id and createdAt)
 */
export const CreateCountrySchema = CountrySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

/**
 * Schema for updating a Country (all fields optional except id)
 */
export const UpdateCountrySchema = CountrySchema.partial().required({
  id: true,
});

/**
 * Schema for Country ID parameter
 */
export const CountryIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * TypeScript types inferred from schemas
 */
export type CountrySchemaType = z.infer<typeof CountrySchema>;
export type CreateCountrySchemaType = z.infer<typeof CreateCountrySchema>;
export type UpdateCountrySchemaType = z.infer<typeof UpdateCountrySchema>;
export type CountryIdSchemaType = z.infer<typeof CountryIdSchema>;
