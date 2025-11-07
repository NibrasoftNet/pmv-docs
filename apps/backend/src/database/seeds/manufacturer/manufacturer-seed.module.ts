import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManufacturerSeedService } from './manufacturer-seed.service.js';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerEntity])],
  providers: [ManufacturerSeedService],
  exports: [ManufacturerSeedService],
})
export class ManufacturerSeedModule {}
