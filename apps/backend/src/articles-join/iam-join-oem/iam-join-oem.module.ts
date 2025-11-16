import { Module } from '@nestjs/common';
import { IamJoinOemService } from './iam-join-oem.service.js';
import { IamJoinOemController } from './iam-join-oem.controller.js';

@Module({
  controllers: [IamJoinOemController],
  providers: [IamJoinOemService],
})
export class IamJoinOemModule {}
