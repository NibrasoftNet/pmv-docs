import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PmvModelSeedService } from './pmv-model-seed.service.js';
import { PmvModelEntity } from '../../../pmv-model/entities/pmv-model.entity.js';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity.js';
import { LanguageEntity } from '../../../language/entities/language.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([PmvModelEntity, ManufacturerEntity, LanguageEntity])],
  providers: [PmvModelSeedService],
  exports: [PmvModelSeedService],
})
export class PmvModelSeedModule {}