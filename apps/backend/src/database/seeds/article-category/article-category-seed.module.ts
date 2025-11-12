import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategoryEntity } from '../../../article-category/entities/article-category.entity.js';
import { ArticleCategorySeedService } from './article-category-seed.service.js';
import { LanguageEntity } from '../../../language/entities/language.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategoryEntity, LanguageEntity])],
  providers: [ArticleCategorySeedService],
  exports: [ArticleCategorySeedService],
})
export class ArticleCategorySeedModule {}
