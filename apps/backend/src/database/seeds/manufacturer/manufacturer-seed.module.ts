import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManufacturerSeedService } from './manufacturer-seed.service.js';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity.js';
import { LanguageEntity } from '../../../language/entities/language.entity.js';
import { CountryEntity } from '../../../country/entities/country.entity.js';
import { FileEntity } from "../../../files/entities/file.entity.js";


@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerEntity, LanguageEntity, CountryEntity, FileEntity])],
  providers: [ManufacturerSeedService],
  exports: [ManufacturerSeedService],
})
export class ManufacturerSeedModule {}
