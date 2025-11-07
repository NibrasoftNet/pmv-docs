import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleCategoryEntity } from '../../../article-category/entities/article-category.entity.js';
import { LanguageEntity } from '../../../language/entites/language.entity.js';
import { enArticleCategory } from './data/en-article-category.js';

@Injectable()
export class ArticleCategorySeedService {
  constructor(
    @InjectRepository(ArticleCategoryEntity)
    private articleCategoryRepository: Repository<ArticleCategoryEntity>,
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,
  ) {}

  async run() {
    const language = await this.languageRepository.findOne({ where: { isoCode: 'en' } });
    if (!language) {
      throw new Error('Language with isoCode "en" not found');
    }

    const categories = this.processCategories(enArticleCategory, language);
    await this.articleCategoryRepository.save(categories);
  }

  private processCategories(data: any, language: LanguageEntity, parent?: ArticleCategoryEntity): ArticleCategoryEntity[] {
    const entities: ArticleCategoryEntity[] = [];

    for (const [key, value] of Object.entries(data)) {
      const category = value as any;
      const entity = this.articleCategoryRepository.create({
        id: category.id,
        name: category.name,
        level: category.level,
        language,
        parent,
        children: [],
      });

      // Process children recursively
      if (category.children && typeof category.children === 'object' && !Array.isArray(category.children)) {
        entity.children = this.processCategories(category.children, language, entity);
      } else if (Array.isArray(category.children)) {
        // If children is array, it's empty or leaf
        entity.children = [];
      }

      entities.push(entity);
    }

    return entities;
  }
}

