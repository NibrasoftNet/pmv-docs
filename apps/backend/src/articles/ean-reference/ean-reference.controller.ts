import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EanReferenceService } from './ean-reference.service.js';
import { CreateEanReferenceDto } from './dto/create-ean-reference.dto.js';
import { UpdateEanReferenceDto } from './dto/update-ean-reference.dto.js';

@Controller('ean-reference')
export class EanReferenceController {
  constructor(private readonly eanReferenceService: EanReferenceService) {}

  @Post()
  create(@Body() createEanReferenceDto: CreateEanReferenceDto) {
    return this.eanReferenceService.create(createEanReferenceDto);
  }

  @Get()
  findAll() {
    return this.eanReferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eanReferenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEanReferenceDto: UpdateEanReferenceDto) {
    return this.eanReferenceService.update(+id, updateEanReferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eanReferenceService.remove(+id);
  }
}
