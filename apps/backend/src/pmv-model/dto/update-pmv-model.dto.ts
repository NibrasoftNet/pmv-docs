import { PartialType } from '@nestjs/mapped-types';
import { CreatePmvModelDto } from './create-pmv-model.dto.js';

export class UpdatePmvModelDto extends PartialType(CreatePmvModelDto) {}
