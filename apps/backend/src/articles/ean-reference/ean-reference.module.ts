import { Module } from '@nestjs/common';
import { EanReferenceService } from './ean-reference.service.js';
import { EanReferenceController } from './ean-reference.controller.js';

@Module({
  controllers: [EanReferenceController],
  providers: [EanReferenceService],
})
export class EanReferenceModule {}
