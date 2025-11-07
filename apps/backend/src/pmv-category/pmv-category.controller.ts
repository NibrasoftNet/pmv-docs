import { Controller } from '@nestjs/common';
import { PmvCategoryService } from './pmv-category.service.js';

@Controller('pmv-category')
export class PmvCategoryController {
  constructor(private readonly pmvCategoryService: PmvCategoryService) {}
}
