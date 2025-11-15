import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PmvSubModelEntity } from '../../../pmv-sub-model/entities/pmv-sub-model.entity.js';
import { EngineEntity } from '../../../engine/entities/engine.entity.js';
import { SubModelJoinEngineEntity } from '../../../sub-model-join-engine/entities/sub-model-join-engine.entity.js';
import { AutoSubModelJoinEngineSeedService } from './auto-sub-model-join-engine-seed.service.js';
import { ComSubModelJoinEngineSeedService } from './com-sub-model-join-engine-seed.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([SubModelJoinEngineEntity, PmvSubModelEntity, EngineEntity])],
  providers: [AutoSubModelJoinEngineSeedService, ComSubModelJoinEngineSeedService],
  exports: [AutoSubModelJoinEngineSeedService, ComSubModelJoinEngineSeedService],
})
export class SubModelJoinEngineSeedModule {}