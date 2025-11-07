import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PmvCategoryEntity } from '../../../pmv-category/entities/pmv-category.entity.js';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class PmvCategorySeedService {
  constructor(
    @InjectRepository(PmvCategoryEntity)
    private repository: Repository<PmvCategoryEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const csvPath = join(__dirname, 'pmv-category-en.csv');
      const csv = fs.readFileSync(csvPath, 'utf-8');
      const lines = csv.split('\n').slice(1).filter(line => line.trim()); // skip header
      const categories = lines.map(line => {
        const [value, label] = line.split(',');
        return { value, label, language: { id: 1 } };
      });
      await this.repository.save(
        categories.map(category => this.repository.create(category)),
      );
    }
  }
}
