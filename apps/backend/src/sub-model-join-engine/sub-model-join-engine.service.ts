import { Injectable } from '@nestjs/common';
import { CreateSubModelJoinEngineDto } from './dto/create-sub-model-join-engine.dto.js';
import { UpdateSubModelJoinEngineDto } from './dto/update-sub-model-join-engine.dto.js';

@Injectable()
export class SubModelJoinEngineService {
  create(createSubModelJoinEngineDto: CreateSubModelJoinEngineDto) {
    return 'This action adds a new subModelJoinEngine';
  }

  findAll() {
    return `This action returns all subModelJoinEngine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subModelJoinEngine`;
  }

  update(id: number, updateSubModelJoinEngineDto: UpdateSubModelJoinEngineDto) {
    return `This action updates a #${id} subModelJoinEngine`;
  }

  remove(id: number) {
    return `This action removes a #${id} subModelJoinEngine`;
  }
}
