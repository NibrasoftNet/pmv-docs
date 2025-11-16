import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IamJoinEanService } from './iam-join-ean.service.js';
import { CreateIamJoinEanDto } from './dto/create-iam-join-ean.dto.js';
import { UpdateIamJoinEanDto } from './dto/update-iam-join-ean.dto.js';

@Controller('iam-join-ean')
export class IamJoinEanController {
  constructor(private readonly iamJoinEanService: IamJoinEanService) {}

  @Post()
  create(@Body() createIamJoinEanDto: CreateIamJoinEanDto) {
    return this.iamJoinEanService.create(createIamJoinEanDto);
  }

  @Get()
  findAll() {
    return this.iamJoinEanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iamJoinEanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIamJoinEanDto: UpdateIamJoinEanDto) {
    return this.iamJoinEanService.update(+id, updateIamJoinEanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iamJoinEanService.remove(+id);
  }
}
