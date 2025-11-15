import { Module } from '@nestjs/common';
import { SubModelJoinEngineService } from './sub-model-join-engine.service.js';
import { SubModelJoinEngineController } from './sub-model-join-engine.controller.js';

@Module({
  controllers: [SubModelJoinEngineController],
  providers: [SubModelJoinEngineService],
})
export class SubModelJoinEngineModule {}
