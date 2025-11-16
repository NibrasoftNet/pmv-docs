import { Module } from '@nestjs/common';
import { OemReferenceService } from './oem-reference.service.js';
import { OemReferenceController } from './oem-reference.controller.js';

@Module({
  controllers: [OemReferenceController],
  providers: [OemReferenceService],
})
export class OemReferenceModule {}
