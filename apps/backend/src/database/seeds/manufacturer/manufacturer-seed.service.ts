import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity.js';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { LanguageEntity } from '../../../language/entities/language.entity.js';
import { CountryEntity } from '../../../country/entities/country.entity.js';
import { FileEntity } from '../../../files/entities/file.entity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class ManufacturerSeedService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private repository: Repository<ManufacturerEntity>,
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,
    @InjectRepository(CountryEntity)
    private countryRepository: Repository<CountryEntity>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async run() {
    try {
      const manufacturerCount = await this.repository.count();
      const language = await this.languageRepository.findOneOrFail({
        where: { id: 1 },
      });

      const country = await this.countryRepository.findOneOrFail({
        where: { isoCodeNo: 276 },
      });
      if (manufacturerCount === 0) {
        const csvPath = join(__dirname, 'data', 'new-manufacturers.csv');
        const csv = fs.readFileSync(csvPath, 'utf-8');
        const lines = csv
          .split('\n')
          .slice(1)
          .filter(line => line.trim()); // skip header if any
        const manufacturers = await Promise.all(
          lines.map(async (entry, index) => {
            try {
              const parts = entry
                .split(',')
                .map(p => p.replace(/\r/g, '').trim());
              if (parts.length !== 15) {
                console.error(
                  `Line ${index + 2}: Invalid number of parts ${parts.length}, entry: ${entry}`,
                );
                throw new Error(`Invalid CSV format at line ${index + 2}`);
              }
              const manufacturerId = parseInt(parts[0] as string, 10);
              if (isNaN(manufacturerId)) {
                console.error(
                  `Line ${index + 2}: Invalid manufacturerId ${parts[3]}`,
                );
                throw new Error(`Invalid manufacturerId at line ${index + 2}`);
              }
              const fileName = parts[14]
                ? parts[14]?.toUpperCase().replace(/\s+/g, '-')
                : null;

              let image: FileEntity | null = null;
              if (fileName) {
                const path = `https://minio-api.nibrasoft.com/pmv-docs-bucket/manufacturers/${fileName}.webp`;
                // Check if file path already exists
                const existingFile = await this.fileRepository.findOne({
                  where: { path },
                });
                if (existingFile) {
                  image = existingFile; // return the existing record
                } else {
                  // Create new file record
                  image = await this.fileRepository.save(
                    this.fileRepository.create({
                      path,
                      mimeType: 'image/png',
                      type: 'manufacturer',
                    }),
                  );
                }
              }
              return {
                manufacturerId,
                name: parts[1],
                isPassengerCar: parts[2] === '1',
                isCommercialVehicle: parts[3] === '1',
                isMotorbike: parts[4] === '1',
                isLCV: parts[5] === '1',
                isDriverCab: parts[6] === '1',
                isAxle: parts[7] === '1',
                isEngine: parts[8] === '1',
                isBus: parts[9] === '1',
                isAftermarket: parts[10] === '1',
                isTractor: parts[11] === '1',
                isVirtualOEM: parts[12] === '1',
                active: true,
                websiteURL: 'https://www.pmv-docs.nibrasoft.com',
                description: parts[13],
                originCountry: country,
                language: language,
                image,
              };
            } catch (e) {
              console.error(`Error parsing line ${index + 2}: ${entry}`, e);
              throw e;
            }
          }),
        );
        const batchSize = 100;
        for (let i = 0; i < manufacturers.length; i += batchSize) {
          const batch = manufacturers.slice(i, i + batchSize);
          await this.repository.save(
            batch.map(manufacturer => this.repository.create(manufacturer)),
          );
        }
      }
    } catch (error) {
      console.error('Error in ManufacturerSeedService.run:', error);
      throw error;
    }
  }
}
