import { Module } from '@nestjs/common';
import { ArticleService } from './iam-reference.service.js';
import { IamReferenceController } from './iam-reference.controller.js';

@Module({
  controllers: [IamReferenceController],
  providers: [ArticleService],
})
export class IamReferenceModule {}
