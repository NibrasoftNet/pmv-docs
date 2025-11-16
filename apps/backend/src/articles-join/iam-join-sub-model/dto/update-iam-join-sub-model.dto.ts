import { PartialType } from '@nestjs/mapped-types';
import { CreateIamJoinSubModelDto } from './create-iam-join-sub-model.dto.js';

export class UpdateIamJoinSubModelDto extends PartialType(CreateIamJoinSubModelDto) {}
