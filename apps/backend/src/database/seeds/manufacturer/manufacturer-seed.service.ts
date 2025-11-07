import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity.js';
import { automobileManufacturer } from './manufacturer-types/1-manufacturers-automobile.js';
import { commercialManufacturer } from './manufacturer-types/2-manufacturer-commercial.js';
import { lcvManufacturer } from './manufacturer-types/4-manufacturer-lcv.js';
import { driverCabManufacturer } from './manufacturer-types/5-manufacturer-driver-cab.js';
import { axleManufacturer } from './manufacturer-types/6-manufacturer-axle.js';
import { engineManufacturer } from './manufacturer-types/7-manfacturer-engine.js';
import { busManufacturer } from './manufacturer-types/8-manufacturer-bus.js';
import { tractorManufacturer } from './manufacturer-types/10-manufacturer-tractor.js';
import { PMVCategoryEnum } from '../../../pmv-category/pmv-category.enum.js';
import { motoManufacturer } from './manufacturer-types/3-manufacturer-moto.js';

@Injectable()
export class ManufacturerSeedService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private repository: Repository<ManufacturerEntity>,
  ) {}

  async run() {
    const automobileCount = await this.repository.count({ where: { pmvCategory: { id: 1 } } });

    if (automobileCount === 0) {
      const automobiles = automobileManufacturer.manufacturers.map(entry => ({
        manufacturerId: entry.manufacturerId,
        name: entry.manufacturerName,
        description: entry.manufacturerName,
        websiteURL: 'https://www.pmv-docs.nibrasoft.com',
        pmvCategory: { id: 1 },
        originCountry: { id: 276 },
      }));
      await this.repository.save(
        automobiles.map(manufacturer => this.repository.create(manufacturer)),
      );
    }

    const commercialCount = await this.repository.count({ where: { pmvCategory: { id: 2 } } });

    if (commercialCount === 0) {
      const commercials = commercialManufacturer.manufacturers.map(entry => ({
        manufacturerId: entry.manufacturerId,
        name: entry.manufacturerName,
        description: entry.manufacturerName,
        websiteURL: 'https://www.pmv-docs.nibrasoft.com',
        pmvCategory: { id: 2 },
        originCountry: { id: 276 },
      }));
      await this.repository.save(
        commercials.map(manufacturer => this.repository.create(manufacturer)),
      );
    }

    const motoCount = await this.repository.count({ where: { pmvCategory: { id: 3 } } });

    if (motoCount === 0) {
      const motos = motoManufacturer.manufacturers.map(entry => ({
        manufacturerId: entry.manufacturerId,
        name: entry.manufacturerName,
        description: entry.manufacturerName,
        websiteURL: 'https://www.pmv-docs.nibrasoft.com',
        pmvCategory: { id: 3 },
        originCountry: { id: 276 },
      }));
      await this.repository.save(
        motos.map(manufacturer => this.repository.create(manufacturer)),
      );
    }

    const lcvCount = await this.repository.count({ where: { pmvCategory: { id: 4 } } });

    if (lcvCount === 0) {
      const lcvs = lcvManufacturer.manufacturers.map(entry => ({
        manufacturerId: entry.manufacturerId,
        name: entry.manufacturerName,
        description: entry.manufacturerName,
        websiteURL: 'https://www.pmv-docs.nibrasoft.com',
        pmvCategory: { id: 4 },
        originCountry: { id: 276 },
      }));
      await this.repository.save(
        lcvs.map(manufacturer => this.repository.create(manufacturer)),
      );
    }

    const driverCount = await this.repository.count({ where: { pmvCategory: { id: 5 } } });

    if (driverCount === 0) {
      const drivers = driverCabManufacturer.manufacturers.map(entry => ({
        manufacturerId: entry.manufacturerId,
        name: entry.manufacturerName,
        description: entry.manufacturerName,
        websiteURL: 'https://www.pmv-docs.nibrasoft.com',
        pmvCategory: { id: 5 },
        originCountry: { id: 276 },
      }));
      await this.repository.save(
        drivers.map(manufacturer => this.repository.create(manufacturer)),
      );
    }

    const axleCount = await this.repository.count({ where: { pmvCategory: { id: 6 } } });

    if (axleCount === 0) {
      const axles = axleManufacturer.manufacturers.map(entry => ({
        manufacturerId: entry.manufacturerId,
        name: entry.manufacturerName,
        description: entry.manufacturerName,
        websiteURL: 'https://www.pmv-docs.nibrasoft.com',
        pmvCategory: { id: 6 },
        originCountry: { id: 276 },
      }));
      await this.repository.save(
        axles.map(manufacturer => this.repository.create(manufacturer)),
      );
    }

    const engineCount = await this.repository.count({ where: { pmvCategory: { id: 7 } } });

    if (engineCount === 0) {
      const engines = engineManufacturer.manufacturers.map(entry => ({
        manufacturerId: entry.manufacturerId,
        name: entry.manufacturerName,
        description: entry.manufacturerName,
        websiteURL: 'https://www.pmv-docs.nibrasoft.com',
        pmvCategory: { id: 7 },
        originCountry: { id: 276 },
      }));
      await this.repository.save(
        engines.map(manufacturer => this.repository.create(manufacturer)),
      );
    }

    const busCount = await this.repository.count({ where: { pmvCategory: { id: 8 } } });

    if (busCount === 0) {
      const buses = busManufacturer.manufacturers.map(entry => ({
        manufacturerId: entry.manufacturerId,
        name: entry.manufacturerName,
        description: entry.manufacturerName,
        websiteURL: 'https://www.pmv-docs.nibrasoft.com',
        pmvCategory: { id: 8 },
        originCountry: { id: 276 },
      }));
      await this.repository.save(
        buses.map(manufacturer => this.repository.create(manufacturer)),
      );
    }

    const tractorCount = await this.repository.count({ where: { pmvCategory: { id: 10 } } });

    if (tractorCount === 0) {
      const tractors = tractorManufacturer.manufacturers.map(entry => ({
        manufacturerId: entry.manufacturerId,
        name: entry.manufacturerName,
        description: entry.manufacturerName,
        websiteURL: 'https://www.pmv-docs.nibrasoft.com',
        pmvCategory: { id: 10 },
        originCountry: { id: 276 },
      }));
      await this.repository.save(
        tractors.map(manufacturer => this.repository.create(manufacturer)),
      );
    }
  }
}
