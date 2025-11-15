import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubModelJoinEngineService } from './sub-model-join-engine.service.js';
import { CreateSubModelJoinEngineDto } from './dto/create-sub-model-join-engine.dto.js';
import { UpdateSubModelJoinEngineDto } from './dto/update-sub-model-join-engine.dto.js';

@Controller('sub-model-join-engine')
export class SubModelJoinEngineController {
  constructor(private readonly subModelJoinEngineService: SubModelJoinEngineService) {}

  @Post()
  create(@Body() createSubModelJoinEngineDto: CreateSubModelJoinEngineDto) {
    return this.subModelJoinEngineService.create(createSubModelJoinEngineDto);
  }

  @Get()
  findAll() {
    return this.subModelJoinEngineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subModelJoinEngineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubModelJoinEngineDto: UpdateSubModelJoinEngineDto) {
    return this.subModelJoinEngineService.update(+id, updateSubModelJoinEngineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subModelJoinEngineService.remove(+id);
  }
}
