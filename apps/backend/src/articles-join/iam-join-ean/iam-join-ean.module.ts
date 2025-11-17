import { Module } from '@nestjs/common';
import { IamJoinEanService } from './iam-join-ean.service.js';
import { IamJoinEanController } from './iam-join-ean.controller.js';

@Module({
  controllers: [IamJoinEanController],
  providers: [IamJoinEanService],
})
export class IamJoinEanModule {}
