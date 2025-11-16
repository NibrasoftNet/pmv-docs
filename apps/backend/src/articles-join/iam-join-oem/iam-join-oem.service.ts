import { Injectable } from '@nestjs/common';
import { CreateIamJoinOemDto } from './dto/create-iam-join-oem.dto.js';
import { UpdateIamJoinOemDto } from './dto/update-iam-join-oem.dto.js';

@Injectable()
export class IamJoinOemService {
  create(createIamJoinOemDto: CreateIamJoinOemDto) {
    return 'This action adds a new iamJoinOem';
  }

  findAll() {
    return `This action returns all iamJoinOem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iamJoinOem`;
  }

  update(id: number, updateIamJoinOemDto: UpdateIamJoinOemDto) {
    return `This action updates a #${id} iamJoinOem`;
  }

  remove(id: number) {
    return `This action removes a #${id} iamJoinOem`;
  }
}
