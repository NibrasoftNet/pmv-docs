import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-iam-reference.dto.js';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
