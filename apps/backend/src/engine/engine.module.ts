import { Module } from '@nestjs/common';
import { EngineService } from './engine.service.js';
import { EngineController } from './engine.controller.js';

@Module({
  controllers: [EngineController],
  providers: [EngineService],
})
export class EngineModule {}
