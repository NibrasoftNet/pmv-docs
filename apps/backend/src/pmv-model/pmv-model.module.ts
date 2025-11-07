import { Module } from '@nestjs/common';
import { PmvModelService } from './pmv-model.service.js';
import { PmvModelController } from './pmv-model.controller.js';

@Module({
  controllers: [PmvModelController],
  providers: [PmvModelService],
})
export class PmvModelModule {}
