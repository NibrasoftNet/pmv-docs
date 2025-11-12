import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PmvSubModelSeedService } from './pmv-sub-model-seed.service.js';
import { PmvSubModelEntity } from '../../../pmv-sub-model/entities/pmv-sub-model.entity.js';
import { PmvModelEntity } from '../../../pmv-model/entities/pmv-model.entity.js';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([PmvSubModelEntity, PmvModelEntity, ManufacturerEntity])],
  providers: [PmvSubModelSeedService],
  exports: [PmvSubModelSeedService],
})
export class PmvSubModelSeedModule {}