import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
//import { CountryFactory } from './country.factory.js';
import { CountryEntity } from '../../../country/entities/country.entity.js';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class CountrySeedService {
  constructor(
    @InjectRepository(CountryEntity)
    private repository: Repository<CountryEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const csvPath = join(__dirname, 'countries.csv');
      const csv = fs.readFileSync(csvPath, 'utf-8');
      const lines = csv.split('\n').slice(1).filter(line => line.trim()); // skip header
      const countries = lines.map(line => {
        const [isoCode1, currencyCode, isGroup, isoCode2, isoCode3, isoCodeNo, Description] = line.split('\t');
        return { isoCode1, currencyCode, isGroup: isGroup === '1', isoCode2, isoCode3, isoCodeNo: isoCodeNo ? parseInt(isoCodeNo) : undefined, Description, language: { id: 1 } };
      });
      await this.repository.save(
        countries.map(country => this.repository.create(country)),
      );
    }
  }
}
