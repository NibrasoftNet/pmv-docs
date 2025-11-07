import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SupplierSeedService } from './supplier-seed.service.js';
import { SupplierEntity } from '../../../supplier/entities/supplier.entity.js';
import { CountryEntity } from '../../../country/entites/country.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity, CountryEntity])],
  providers: [SupplierSeedService],
  exports: [SupplierSeedService],
})
export class SupplierSeedModule {}
