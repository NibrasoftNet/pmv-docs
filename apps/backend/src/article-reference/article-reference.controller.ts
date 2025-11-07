import { Controller } from '@nestjs/common';
import { ArticleReferenceService } from './article-reference.service.js';

@Controller('article-reference')
export class ArticleReferenceController {
  constructor(private readonly articleReferenceService: ArticleReferenceService) {}
}
