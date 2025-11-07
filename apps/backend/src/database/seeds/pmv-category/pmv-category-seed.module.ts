import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PmvCategorySeedService } from './pmv-category-seed.service.js';
import { PmvCategoryEntity } from '../../../pmv-category/entities/pmv-category.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([PmvCategoryEntity])],
  providers: [PmvCategorySeedService],
  exports: [PmvCategorySeedService],
})
export class PmvCategorySeedModule {}
