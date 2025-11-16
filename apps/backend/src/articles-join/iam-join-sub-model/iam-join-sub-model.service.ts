import { Injectable } from '@nestjs/common';
import { CreateIamJoinSubModelDto } from './dto/create-iam-join-sub-model.dto.js';
import { UpdateIamJoinSubModelDto } from './dto/update-iam-join-sub-model.dto.js';

@Injectable()
export class IamJoinSubModelService {
  create(createIamJoinSubModelDto: CreateIamJoinSubModelDto) {
    return 'This action adds a new iamJoinSubModel';
  }

  findAll() {
    return `This action returns all iamJoinSubModel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iamJoinSubModel`;
  }

  update(id: number, updateIamJoinSubModelDto: UpdateIamJoinSubModelDto) {
    return `This action updates a #${id} iamJoinSubModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} iamJoinSubModel`;
  }
}
