import { Module } from '@nestjs/common';
import { PmvSubModelService } from './pmv-sub-model.service.js';
import { PmvSubModelController } from './pmv-sub-model.controller.js';

@Module({
  controllers: [PmvSubModelController],
  providers: [PmvSubModelService],
})
export class PmvSubModelModule {}
