import { Injectable } from '@nestjs/common';
import { CreateIamJoinEanDto } from './dto/create-iam-join-ean.dto.js';
import { UpdateIamJoinEanDto } from './dto/update-iam-join-ean.dto.js';

@Injectable()
export class IamJoinEanService {
  create(createIamJoinEanDto: CreateIamJoinEanDto) {
    return 'This action adds a new iamJoinEan';
  }

  findAll() {
    return `This action returns all iamJoinEan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iamJoinEan`;
  }

  update(id: number, updateIamJoinEanDto: UpdateIamJoinEanDto) {
    return `This action updates a #${id} iamJoinEan`;
  }

  remove(id: number) {
    return `This action removes a #${id} iamJoinEan`;
  }
}
