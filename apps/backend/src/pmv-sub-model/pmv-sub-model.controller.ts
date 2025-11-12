import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PmvSubModelService } from './pmv-sub-model.service.js';
import { CreatePmvSubModelDto } from './dto/create-pmv-sub-model.dto.js';
import { UpdatePmvSubModelDto } from './dto/update-pmv-sub-model.dto.js';

@Controller('pmv-sub-model')
export class PmvSubModelController {
  constructor(private readonly pmvSubModelService: PmvSubModelService) {}

  @Post()
  create(@Body() createPmvSubModelDto: CreatePmvSubModelDto) {
    return this.pmvSubModelService.create(createPmvSubModelDto);
  }

  @Get()
  findAll() {
    return this.pmvSubModelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pmvSubModelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePmvSubModelDto: UpdatePmvSubModelDto) {
    return this.pmvSubModelService.update(+id, updatePmvSubModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pmvSubModelService.remove(+id);
  }
}
