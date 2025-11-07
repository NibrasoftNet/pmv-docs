import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategoryService } from './article-category.service.js';
import { ArticleCategoryController } from './article-category.controller.js';
import { ArticleCategoryEntity } from './entities/article-category.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategoryEntity])],
  controllers: [ArticleCategoryController],
  providers: [ArticleCategoryService],
})
export class ArticleCategoryModule {}
