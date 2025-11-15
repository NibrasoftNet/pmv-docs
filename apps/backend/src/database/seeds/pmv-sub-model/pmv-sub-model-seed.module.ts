import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PmvSubModelEntity } from '../../../pmv-sub-model/entities/pmv-sub-model.entity.js';
import { PmvModelEntity } from '../../../pmv-model/entities/pmv-model.entity.js';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity.js';
import { PmvSubModelAutoSeedService } from './pmv-sub-model-auto-seed.service.js';
import { PmvSubModelComSeedService } from './pmv-sub-model-com-seed.service.js';
import { PmvSubModelMotoSeedService } from './pmv-sub-model-moto-seed.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([PmvSubModelEntity, PmvModelEntity, ManufacturerEntity])],
  providers: [PmvSubModelAutoSeedService, PmvSubModelComSeedService, PmvSubModelMotoSeedService],
  exports: [PmvSubModelAutoSeedService, PmvSubModelComSeedService, PmvSubModelMotoSeedService],
})
export class PmvSubModelSeedModule {}