import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PmvModelEntity } from '../../../pmv-model/entities/pmv-model.entity.js';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity.js';
import { LanguageEntity } from '../../../language/entities/language.entity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class PmvModelSeedService {
  constructor(
    @InjectRepository(PmvModelEntity)
    private repository: Repository<PmvModelEntity>,
    @InjectRepository(ManufacturerEntity)
    private manufacturerRepository: Repository<ManufacturerEntity>,
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,
  ) {}

  async run() {
    try {
      const modelCount = await this.repository.count();
      const language = await this.languageRepository.findOneOrFail({ where: { id: 1 } });
      if (modelCount === 0) {
        // Load manufacturers and create a map for quick lookup
        const manufacturers = await this.manufacturerRepository.find();
        const manufacturerMap = new Map(manufacturers.map(m => [m.manufacturerId, m]));

        const csvPath = join(__dirname, 'data', 'new-models.csv');
        const csv = fs.readFileSync(csvPath, 'utf-8');
        const lines = csv.split('\n').slice(1).filter((line) => line.trim()); // skip header if any        
        const models = lines.map((entry, index) => {
          try {
            const parts = entry.split(',').map(p => p.replace(/\r/g, '').trim());
            if (parts.length !== 16) {
              console.error(`Line ${index + 2}: Invalid number of parts ${parts.length}, entry: ${entry}`);
              throw new Error(`Invalid CSV format at line ${index + 2}`);
            }
            const manufacturerId = parseInt(parts[1] as string, 10);
            if (isNaN(manufacturerId)) {
              console.error(`Line ${index + 2}: Invalid manufacturerId ${parts[1]}`);
              throw new Error(`Invalid manufacturerId at line ${index + 2}`);
            }
            const manufacturer = manufacturerMap.get(manufacturerId);
            if (!manufacturer) {
              console.error(`Line ${index + 2}: Manufacturer with id ${manufacturerId} not found`);
              throw new Error(`Manufacturer not found at line ${index + 2}`);
            }
            return {
              modelId: parseInt(parts[0] as string, 10),
              manufacturer,
              startYear: parts[2] === 'null' ? null : new Date(parts[2] as string),
              endYear: parts[3] === 'null' ? null : new Date(parts[3] as string),
              name: parts[4],
              isPassengerCar: parts[5] === '1',
              isCommercialVehicle: parts[6] === '1',
              isMotorbike: parts[7] === '1',
              isLCV: parts[8] === '1',
              isDriverCab: parts[9] === '1',
              isAxle: parts[10] === '1',
              isEngine: parts[11] === '1',
              isBus: parts[12] === '1',
              isAftermarket: parts[13] === '1',
              isTractor: parts[14] === '1',
              isVirtualOEM: parts[15] === '1',
              active: true,
              language: language,
            };
          } catch (e) {
            console.error(`Error parsing line ${index + 2}: ${entry}`, e);
            throw e;
          }
        });
        const batchSize = 100;
        for (let i = 0; i < models.length; i += batchSize) {
          const batch = models.slice(i, i + batchSize);
          await this.repository.save(
            batch.map(model => this.repository.create(model)),
          );
        }
      }
    } catch (error) {
      console.error('Error in PmvModelSeedService.run:', error);
      throw error;
    }
  }
}