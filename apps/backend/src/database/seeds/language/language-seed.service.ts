import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { LanguageEntity } from '../../../language/entities/language.entity.js';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class LanguageSeedService {
  constructor(
    @InjectRepository(LanguageEntity)
    private repository: Repository<LanguageEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();
    if (count === 0) {
      console.log("start seed language..."); 
      const csvPath = join(__dirname, './data/languages.csv');
      const csv = fs.readFileSync(csvPath, 'utf-8');
      const lines = csv.split('\n').slice(1).filter(line => line.trim()); // skip header
      const languages = lines.map(line => {
        const [id, name, isoCode, locale, flagEmoji] = line.split('\t');
        return { name, isoCode, locale, flagEmoji };
      });
      await this.repository.save(
        languages.map(lang => this.repository.create(lang)),
      );
    }
  }
}
