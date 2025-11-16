import { Module } from '@nestjs/common';
import { IamJoinEanService } from './iam-join-ean.service';
import { IamJoinEanController } from './iam-join-ean.controller';

@Module({
  controllers: [IamJoinEanController],
  providers: [IamJoinEanService],
})
export class IamJoinEanModule {}
