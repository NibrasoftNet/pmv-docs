import { PartialType } from '@nestjs/mapped-types';
import { CreateIamJoinOemDto } from './create-iam-join-oem.dto.js';

export class UpdateIamJoinOemDto extends PartialType(CreateIamJoinOemDto) {}
