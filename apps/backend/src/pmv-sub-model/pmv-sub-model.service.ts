import { Injectable } from '@nestjs/common';
import { CreatePmvSubModelDto } from './dto/create-pmv-sub-model.dto.js';
import { UpdatePmvSubModelDto } from './dto/update-pmv-sub-model.dto.js';

@Injectable()
export class PmvSubModelService {
  create(createPmvSubModelDto: CreatePmvSubModelDto) {
    return 'This action adds a new pmvSubModel';
  }

  findAll() {
    return `This action returns all pmvSubModel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pmvSubModel`;
  }

  update(id: number, updatePmvSubModelDto: UpdatePmvSubModelDto) {
    return `This action updates a #${id} pmvSubModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} pmvSubModel`;
  }
}
