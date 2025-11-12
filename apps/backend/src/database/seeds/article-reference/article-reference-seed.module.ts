import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from '../../../language/entities/language.entity.js';
import { ArticleReferenceEntity } from '../../../article-reference/entities/article-reference.entity.js';
import { ArticleReferenceSeedService } from './article-reference-seed.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleReferenceEntity, LanguageEntity])],
  providers: [ArticleReferenceSeedService],
  exports: [ArticleReferenceSeedService],
})
export class ArticleReferenceSeedModule {}