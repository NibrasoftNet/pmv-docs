import { SupplierSchema } from '@workspace/orpc';
import { createZodDto } from 'nestjs-zod';

export class SupplierDto extends createZodDto(SupplierSchema) {}
