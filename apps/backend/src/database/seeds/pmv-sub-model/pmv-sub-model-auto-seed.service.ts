import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PmvSubModelEntity } from '../../../pmv-sub-model/entities/pmv-sub-model.entity.js';
import { PmvModelEntity } from '../../../pmv-model/entities/pmv-model.entity.js';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class PmvSubModelAutoSeedService {
  constructor(
    @InjectRepository(PmvSubModelEntity)
    private repository: Repository<PmvSubModelEntity>,
    @InjectRepository(PmvModelEntity)
    private modelRepository: Repository<PmvModelEntity>,
    @InjectRepository(ManufacturerEntity)
    private manufacturerRepository: Repository<ManufacturerEntity>,
  ) {}

  async run() {
    try {
      const modelCount = await this.repository.count({ where: { pmvCategory: { id: 1 } } });
      if (modelCount === 0) {
        const csvPath = join(__dirname, 'data', 'new-sub-model-auto.csv');
        const csv = fs.readFileSync(csvPath, 'utf-8');
        const lines = csv.split('\n').slice(1).filter((line) => line.trim()); // skip header if any
        const batchSize = 100;
        for (let i = 0; i < lines.length; i += batchSize) {
          const batchLines = lines.slice(i, i + batchSize);
          const batchPromises = batchLines.map(async (entry, localIndex) => {
            const globalIndex = i + localIndex;
            try {
              const parts = entry.split(',').map(p => p.replace(/\r/g, '').trim());
              if (parts.length !== 7) {
                console.error(`Line ${globalIndex + 2}: Invalid number of parts ${parts.length}, entry: ${entry}`);
                throw new Error(`Invalid CSV format at line ${globalIndex + 2}`);
              }
              const modelId = parseInt(parts[1] as string, 10);
              if (isNaN(modelId)) {
                console.error(`Line ${globalIndex + 2}: Invalid modelId ${parts[1]}`);
                throw new Error(`Invalid modelId at line ${globalIndex + 2}`);
              }
              const manufacturerId = parseInt(parts[2] as string, 10);
              if (isNaN(manufacturerId)) {
                console.error(`Line ${globalIndex + 2}: Invalid manufacturerId ${parts[2]}`);
                throw new Error(`Invalid manufacturerId at line ${globalIndex + 2}`);
              }
              const model = await this.modelRepository.findOneOrFail({ where: { modelId } });
              const manufacturer = await this.manufacturerRepository.findOneOrFail({ where: { manufacturerId } });
              return {
                subModelId: parseInt(parts[0] as string, 10),
                model,
                manufacturer,
                startYear: parts[3] === 'null' ? null : new Date(parts[3] as string),
                endYear: parts[4] === 'null' ? null : new Date(parts[4] as string),
                name: parts[5],
                pmvCategory: {  id: parseInt(parts[6] as string, 10) },
                active: true,
                language: { id: 1 },
              };
            } catch (e) {
              console.error(`Error parsing line ${globalIndex + 2}: ${entry}`, e);
              throw e;
            }
          });
          const resolvedBatch = await Promise.all(batchPromises);
          await this.repository.save(
            resolvedBatch.map(model => this.repository.create(model)),
          );
        }
      }
    } catch (error) {
      console.error('Error in PmvModelSeedService.run:', error);
      throw error;
    }
  }
}