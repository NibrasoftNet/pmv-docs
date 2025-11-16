import { Injectable } from '@nestjs/common';
import { CreateEanReferenceDto } from './dto/create-ean-reference.dto.js';
import { UpdateEanReferenceDto } from './dto/update-ean-reference.dto.js';

@Injectable()
export class EanReferenceService {
  create(createEanReferenceDto: CreateEanReferenceDto) {
    return 'This action adds a new eanReference';
  }

  findAll() {
    return `This action returns all eanReference`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eanReference`;
  }

  update(id: number, updateEanReferenceDto: UpdateEanReferenceDto) {
    return `This action updates a #${id} eanReference`;
  }

  remove(id: number) {
    return `This action removes a #${id} eanReference`;
  }
}
