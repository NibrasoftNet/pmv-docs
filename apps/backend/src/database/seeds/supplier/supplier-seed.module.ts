import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SupplierSeedService } from './supplier-seed.service.js';
import { SupplierEntity } from '../../../supplier/entities/supplier.entity.js';
import { CountryEntity } from '../../../country/entities/country.entity.js';
import { FileEntity } from '../../../files/entities/file.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierEntity, CountryEntity, FileEntity]),
  ],
  providers: [SupplierSeedService],
  exports: [SupplierSeedService],
})
export class SupplierSeedModule {}
