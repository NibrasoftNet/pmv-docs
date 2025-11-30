import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from '../../../supplier/entities/supplier.entity.js';
import { CountryEntity } from '../../../country/entities/country.entity.js';
import { FileEntity } from '../../../files/entities/file.entity.js';
import { enSuppliers } from './data/en-suppliers.js';

@Injectable()
export class SupplierSeedService {
  constructor(
    @InjectRepository(SupplierEntity)
    private supplierRepository: Repository<SupplierEntity>,
    @InjectRepository(CountryEntity)
    private countryRepository: Repository<CountryEntity>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async run() {
    const country = await this.countryRepository.findOne({
      where: { isoCodeNo: 276 },
    });
    if (!country) {
      throw new Error('Country with isoCodeNo 276 not found');
    }

    const suppliers = await Promise.all(
      enSuppliers.map(async supplier => {
        const image = await this.fileRepository.save(
          this.fileRepository.create({
            path: `https://minio-api.nibrasoft.com/pmv-docs-bucket/suppliers/${supplier.image.toUpperCase()}.webp`,
            mimeType: 'image/webp',
            type: 'supplier',
          }),
        );
        return {
          id: supplier.id,
          name: supplier.name,
          matchCode: supplier.matchCode,
          description: null,
          originCountry: country,
          image: image,
        };
      }),
    );

    await this.supplierRepository.insert(suppliers);
  }
}
