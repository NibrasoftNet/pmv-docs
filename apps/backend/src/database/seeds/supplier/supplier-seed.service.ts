import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from '../../../supplier/entities/supplier.entity.js';
import { CountryEntity } from '../../../country/entities/country.entity.js';
import { enSuppliers } from './data/en-suppliers.js';

@Injectable()
export class SupplierSeedService {
  constructor(
    @InjectRepository(SupplierEntity)
    private supplierRepository: Repository<SupplierEntity>,
    @InjectRepository(CountryEntity)
    private countryRepository: Repository<CountryEntity>,
  ) {}

  async run() {
    const country = await this.countryRepository.findOne({ where: { isoCodeNo: 276 } });
    if (!country) {
      throw new Error('Country with isoCodeNo 276 not found');
    }

    const suppliers = enSuppliers.map(supplier => ({
      id: supplier.id,
      name: supplier.name,
      matchCode: supplier.matchCode,
      description: null,
      originCountry: country,
      image: null,
    }));

    await this.supplierRepository.insert(suppliers);
  }
}
