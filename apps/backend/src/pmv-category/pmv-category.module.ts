import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PmvCategoryService } from './pmv-category.service.js';
import { PmvCategoryController } from './pmv-category.controller.js';
import { PmvCategoryEntity } from './entities/pmv-category.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([PmvCategoryEntity])],
  controllers: [PmvCategoryController],
  providers: [PmvCategoryService],
})
export class PmvCategoryModule {}
