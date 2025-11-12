import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../../../article/entities/article.entity.js';
import { ArticleCategoryEntity } from '../../../article-category/entities/article-category.entity.js';
import { ArticleReferenceEntity } from '../../../article-reference/entities/article-reference.entity.js';
import { LanguageEntity } from '../../../language/entities/language.entity.js';
import { enArticle } from './data/en-article.js';


@Injectable()
export class ArticleSeedService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    @InjectRepository(ArticleCategoryEntity)
    private articleCategoryRepository: Repository<ArticleCategoryEntity>,
    @InjectRepository(ArticleReferenceEntity)
    private articleReferenceRepository: Repository<ArticleReferenceEntity>,
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,
  ) {}

  async run() {
    const language = await this.languageRepository.findOne({ where: { isoCode: 'en' } });
    if (!language) {
      throw new Error('Language with isoCode "en" not found');
    }

    const articles = await this.processArticles(enArticle, language);
    await this.articleRepository.save(articles);
  }

  private async processArticles(data: any[], language: LanguageEntity): Promise<ArticleEntity[]> {
    const entities: ArticleEntity[] = [];

    for (const item of data) {
      // Find the article category by ID
      const articleCategory = await this.articleCategoryRepository.findOne({
        where: { id: item.articleCategoryId }
      });
      if (!articleCategory) {
        throw new Error(`ArticleCategory with id ${item.articleCategoryId} not found`);
      }

      // Find the article reference by code
      const articleReference = await this.articleReferenceRepository.findOne({
        where: { code: item.articleReferenceCode, language: { id: language.id } }
      });
      if (!articleReference) {
        throw new Error(`ArticleReference with code ${item.articleReferenceCode} not found`);
      }

      const entity = this.articleRepository.create({
        name: item.name,
        code: item.code,
        articleCategory,
        articleReference,
        language,
      });

      entities.push(entity);
    }

    return entities;
  }
}