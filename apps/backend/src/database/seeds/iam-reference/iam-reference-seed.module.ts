import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamReferenceEntity } from '../../../articles/iam-reference/entities/iam-reference.entity.js';
import { ArticleCategoryEntity } from '../../../article-category/entities/article-category.entity.js';
import { ArticleReferenceEntity } from '../../../article-reference/entities/article-reference.entity.js';
import { LanguageEntity } from '../../../language/entities/language.entity.js';
import { ArticleSeedService } from './iam-reference-seed.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([IamReferenceEntity, ArticleCategoryEntity, ArticleReferenceEntity, LanguageEntity])],
  providers: [ArticleSeedService],
  exports: [ArticleSeedService],
})
export class IamReferenceSeedModule {}