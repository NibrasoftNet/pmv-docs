import { PartialType } from '@nestjs/mapped-types';
import { CreateEngineDto } from './create-engine.dto.js';

export class UpdateEngineDto extends PartialType(CreateEngineDto) {}
