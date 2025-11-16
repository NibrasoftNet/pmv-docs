import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IamJoinSubModelService } from './iam-join-sub-model.service.js';
import { CreateIamJoinSubModelDto } from './dto/create-iam-join-sub-model.dto.js';
import { UpdateIamJoinSubModelDto } from './dto/update-iam-join-sub-model.dto.js';

@Controller('iam-join-sub-model')
export class IamJoinSubModelController {
  constructor(private readonly iamJoinSubModelService: IamJoinSubModelService) {}

  @Post()
  create(@Body() createIamJoinSubModelDto: CreateIamJoinSubModelDto) {
    return this.iamJoinSubModelService.create(createIamJoinSubModelDto);
  }

  @Get()
  findAll() {
    return this.iamJoinSubModelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iamJoinSubModelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIamJoinSubModelDto: UpdateIamJoinSubModelDto) {
    return this.iamJoinSubModelService.update(+id, updateIamJoinSubModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iamJoinSubModelService.remove(+id);
  }
}
