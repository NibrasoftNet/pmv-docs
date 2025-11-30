import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierEntity } from './entities/supplier.entity.js';
import { SupplierSchemaType } from '@workspace/orpc';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
  ) {}

  async list(): Promise<SupplierEntity[]> {
    try {
      return await this.supplierRepository.find();
    } catch (error) {
      console.error('Error in supplier.list():', error);
      throw error;
    }
  }
}
