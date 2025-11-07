import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerService } from './manufacturer.service.js';
import { ManufacturerController } from './manufacturer.controller.js';
import { ManufacturerEntity } from './entities/manufacturer.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerEntity])],
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
})
export class ManufacturerModule {}