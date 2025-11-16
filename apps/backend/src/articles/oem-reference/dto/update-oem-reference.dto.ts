import { PartialType } from '@nestjs/mapped-types';
import { CreateOemReferenceDto } from './create-oem-reference.dto.js';

export class UpdateOemReferenceDto extends PartialType(CreateOemReferenceDto) {}
