import { Injectable } from '@nestjs/common';
import { CreatePmvModelDto } from './dto/create-pmv-model.dto.js';
import { UpdatePmvModelDto } from './dto/update-pmv-model.dto.js';

@Injectable()
export class PmvModelService {
  create(createModelDto: CreatePmvModelDto) {
    return 'This action adds a new model';
  }

  findAll() {
    return `This action returns all model`;
  }

  findOne(id: number) {
    return `This action returns a #${id} model`;
  }

  update(id: number, updateModelDto: UpdatePmvModelDto) {
    return `This action updates a #${id} model`;
  }

  remove(id: number) {
    return `This action removes a #${id} model`;
  }
}
