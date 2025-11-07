import { Controller } from '@nestjs/common';
import { ArticleCategoryService } from './article-category.service.js';

@Controller('article-category')
export class ArticleCategoryController {
  constructor(private readonly articleCategoryService: ArticleCategoryService) {}
}
