import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PmvSubModelEntity } from '../../../pmv-sub-model/entities/pmv-sub-model.entity.js';
import { EngineEntity } from '../../../engine/entities/engine.entity.js';
import { SubModelJoinEngineEntity } from '../../../sub-model-join-engine/entities/sub-model-join-engine.entity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class AutoSubModelJoinEngineSeedService {
  constructor(
    @InjectRepository(SubModelJoinEngineEntity)
    private repository: Repository<SubModelJoinEngineEntity>,
    @InjectRepository(PmvSubModelEntity)
    private pmvSubModelRepository: Repository<PmvSubModelEntity>,
    @InjectRepository(EngineEntity)
    private engineRepository: Repository<EngineEntity>,
  ) {}

  async run() {
    try {
      const modelCount = await this.repository.count({ where: { pmvCategory: { id: 1 } } });
      if (modelCount === 0) {
        const csvPath = join(__dirname, 'data', 'new-link-auto-engine.csv');
        const csv = fs.readFileSync(csvPath, 'utf-8');
        const lines = csv.split('\n').slice(1).filter((line) => line.trim()); // skip header if any
        const batchSize = 100;
        for (let i = 0; i < lines.length; i += batchSize) {
          const batchLines = lines.slice(i, i + batchSize);
          const batchPromises = batchLines.map(async (entry, localIndex) => {
            const globalIndex = i + localIndex;
            try {
              const parts = entry.split(',').map(p => p.replace(/\r/g, '').trim());
              if (parts.length !== 2) {
                console.error(`Line ${globalIndex + 2}: Invalid number of parts ${parts.length}, entry: ${entry}`);
                throw new Error(`Invalid CSV format at line ${globalIndex + 2}`);
              }
              const subModelId = parseInt(parts[0] as string, 10);
              if (isNaN(subModelId)) {
                console.error(`Line ${globalIndex + 2}: Invalid subModelId ${parts[0]}`);
                throw new Error(`Invalid subModelId at line ${globalIndex + 2}`);
              }
              const engineId = parseInt(parts[1] as string, 10);
              if (isNaN(engineId)) {
                console.error(`Line ${globalIndex + 2}: Invalid engineId ${parts[1]}`);
                throw new Error(`Invalid engineId at line ${globalIndex + 2}`);
              }
              const subModel = await this.pmvSubModelRepository.findOneOrFail({ where: { subModelId } });
              const engine = await this.engineRepository.findOneOrFail({ where: { engineId } });
              return {
                subModel,
                engine,
                pmvCategory: { id: 1 },
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