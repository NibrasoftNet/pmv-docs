import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PmvModelService } from './pmv-model.service.js';
import { CreatePmvModelDto } from './dto/create-pmv-model.dto.js';
import { UpdatePmvModelDto } from './dto/update-pmv-model.dto.js';

@Controller('model')
export class PmvModelController {
  constructor(private readonly modelService: PmvModelService) {}

  @Post()
  create(@Body() createModelDto: CreatePmvModelDto) {
    return this.modelService.create(createModelDto);
  }

  @Get()
  findAll() {
    return this.modelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdatePmvModelDto) {
    return this.modelService.update(+id, updateModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelService.remove(+id);
  }
}
