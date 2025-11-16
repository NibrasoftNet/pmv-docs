import { Module } from '@nestjs/common';
import { IamJoinSubModelService } from './iam-join-sub-model.service.js';
import { IamJoinSubModelController } from './iam-join-sub-model.controller.js';

@Module({
  controllers: [IamJoinSubModelController],
  providers: [IamJoinSubModelService],
})
export class IamJoinSubModelModule {}
