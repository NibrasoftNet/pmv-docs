import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountrySeedService } from './country-seed.service.js';
import { CountryEntity } from '../../../country/entites/country.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountrySeedService],
  exports: [CountrySeedService],
})
export class CountrySeedModule {}
