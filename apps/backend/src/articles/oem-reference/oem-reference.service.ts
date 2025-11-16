import { Injectable } from '@nestjs/common';
import { CreateOemReferenceDto } from './dto/create-oem-reference.dto.js';
import { UpdateOemReferenceDto } from './dto/update-oem-reference.dto.js';

@Injectable()
export class OemReferenceService {
  create(createOemReferenceDto: CreateOemReferenceDto) {
    return 'This action adds a new oemReference';
  }

  findAll() {
    return `This action returns all oemReference`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oemReference`;
  }

  update(id: number, updateOemReferenceDto: UpdateOemReferenceDto) {
    return `This action updates a #${id} oemReference`;
  }

  remove(id: number) {
    return `This action removes a #${id} oemReference`;
  }
}
