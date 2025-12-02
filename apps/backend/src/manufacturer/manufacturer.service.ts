import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManufacturerEntity } from './entities/manufacturer.entity.js';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private readonly manufacturerRepository: Repository<ManufacturerEntity>,
  ) {}

  async list() {
    return await this.manufacturerRepository.find();
  }
}
