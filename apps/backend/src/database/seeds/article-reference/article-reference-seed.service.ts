import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageEntity } from '../../../language/entities/language.entity.js';
import { ArticleReferenceEntity } from '../../../article-reference/entities/article-reference.entity.js';
import { enArticleReference } from './data/en-article-reference.js';

@Injectable()
export class ArticleReferenceSeedService {
  constructor(
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

    const entities = enArticleReference.map(item => ({
      code: item.code,
      name: item.name,
      language,
    }));

    await this.articleReferenceRepository.save(entities);
  }
}
