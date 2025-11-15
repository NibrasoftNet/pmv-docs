import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { EngineEntity } from '../../../engine/entities/engine.entity.js';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class EngineSeedService {
  constructor(
    @InjectRepository(EngineEntity)
    private repository: Repository<EngineEntity>,
    @InjectRepository(ManufacturerEntity)
    private manufacturerRepository: Repository<ManufacturerEntity>,
  ) {}

  async run() {
    try {
      const engineCount = await this.repository.count();
      if (engineCount === 0) {
        const csvPath = join(__dirname, 'data', 'new-engines.csv');
        const csv = fs.readFileSync(csvPath, 'utf-8');
        const lines = csv.split('\n').slice(1).filter((line) => line.trim()); // skip header if any        
        const engines = lines.map(async (entry, index) => {
          try {
            const parts = entry.split(',').map(p => p.replace(/\r/g, '').trim());
            if (parts.length !== 7) {
              console.error(`Line ${index + 2}: Invalid number of parts ${parts.length}, entry: ${entry}`);
              throw new Error(`Invalid CSV format at line ${index + 2}`);
            }
            const manufacturerId = parseInt(parts[2] as string, 10);
            if (isNaN(manufacturerId)) {
              console.error(`Line ${index + 2}: Invalid manufacturerId ${parts[1]}`);
              throw new Error(`Invalid manufacturerId at line ${index + 2}`);
            }
            const manufacturer = await this.manufacturerRepository.findOneOrFail({ where: { manufacturerId } });
            return {
              engineId: parseInt(parts[0] as string, 10),
              manufacturer,
              name: parts[3],
              description: parts[4],
              startYear: parts[5] === 'null' ? null : new Date(parts[5] as string),
              endYear: parts[6] === 'null' ? null : new Date(parts[6] as string),
              active: true,
              language: { id: 1 },
            };
          } catch (e) {
            console.error(`Error parsing line ${index + 2}: ${entry}`, e);
            throw e;
          }
        });
        const resolvedEngines = await Promise.all(engines);
        const batchSize = 100;
        for (let i = 0; i < resolvedEngines.length; i += batchSize) {
          const batch = resolvedEngines.slice(i, i + batchSize);
          await this.repository.save(
            batch.map(engine => this.repository.create(engine)),
          );
        }
      }
    } catch (error) {
      console.error('Error in EngineSeedService.run:', error);
      throw error;
    }
  }
}