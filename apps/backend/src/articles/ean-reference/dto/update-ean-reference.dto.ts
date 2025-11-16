import { PartialType } from '@nestjs/mapped-types';
import { CreateEanReferenceDto } from './create-ean-reference.dto.js';

export class UpdateEanReferenceDto extends PartialType(CreateEanReferenceDto) {}
