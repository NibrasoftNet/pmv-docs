import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '../../../article/entities/article.entity.js';
import { ArticleCategoryEntity } from '../../../article-category/entities/article-category.entity.js';
import { ArticleReferenceEntity } from '../../../article-reference/entities/article-reference.entity.js';
import { LanguageEntity } from '../../../language/entities/language.entity.js';
import { ArticleSeedService } from './article-seed.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, ArticleCategoryEntity, ArticleReferenceEntity, LanguageEntity])],
  providers: [ArticleSeedService],
  exports: [ArticleSeedService],
})
export class ArticleSeedModule {}