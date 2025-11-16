import { PartialType } from '@nestjs/mapped-types';
import { CreateIamJoinEanDto } from './create-iam-join-ean.dto.js';

export class UpdateIamJoinEanDto extends PartialType(CreateIamJoinEanDto) {}
