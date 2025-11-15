import { PartialType } from '@nestjs/mapped-types';
import { CreateSubModelJoinEngineDto } from './create-sub-model-join-engine.dto.js';

export class UpdateSubModelJoinEngineDto extends PartialType(CreateSubModelJoinEngineDto) {}
