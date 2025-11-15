import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EngineEntity } from '../../../engine/entities/engine.entity.js';
import { EngineSeedService } from './engine-seed.service.js';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([EngineEntity, ManufacturerEntity])],
  providers: [EngineSeedService],
  exports: [EngineSeedService],
})
export class EngineSeedModule {}