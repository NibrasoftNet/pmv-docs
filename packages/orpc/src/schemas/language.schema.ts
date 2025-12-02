import { z } from 'zod';

/**
 * Language schema with all fields
 */
export const LanguageSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Name is required').max(200, 'Name too long'),
  isoCode: z.string().max(10, 'ISO code too long').optional(),
  locale: z.string().max(10, 'Locale too long').optional(),
  flagEmoji: z.string().max(10, 'Flag emoji too long').optional(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  deletedAt: z.union([z.date(), z.string()]).optional().nullable(),
});

/**
 * Schema for creating a new language (without id and createdAt)
 */
export const CreateLanguageSchema = LanguageSchema.omit({
  id: true,
  createdAt: true,
  deletedAt: true,
  updatedAt: true,
});

/**
 * Schema for updating a language (all fields optional except id)
 */
export const UpdateLanguageSchema = LanguageSchema.partial().required({
  id: true,
});

/**
 * Schema for language ID parameter
 */
export const LanguageIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * TypeScript types inferred from schemas
 */
export type LanguageSchemaType = z.infer<typeof LanguageSchema>;
export type CreateLanguageSchemaType = z.infer<typeof CreateLanguageSchema>;
export type UpdateLanguageSchemaType = z.infer<typeof UpdateLanguageSchema>;
export type LanguageIdSchemaType = z.infer<typeof LanguageIdSchema>;
