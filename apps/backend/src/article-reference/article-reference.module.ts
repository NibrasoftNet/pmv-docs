import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleReferenceService } from './article-reference.service.js';
import { ArticleReferenceController } from './article-reference.controller.js';
import { ArticleReferenceEntity } from './entities/article-reference.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleReferenceEntity])],
  controllers: [ArticleReferenceController],
  providers: [ArticleReferenceService],
})
export class ArticleReferenceModule {}
