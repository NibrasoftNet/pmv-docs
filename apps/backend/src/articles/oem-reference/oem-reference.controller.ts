import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OemReferenceService } from './oem-reference.service.js';
import { CreateOemReferenceDto } from './dto/create-oem-reference.dto.js';
import { UpdateOemReferenceDto } from './dto/update-oem-reference.dto.js';

@Controller('oem-reference')
export class OemReferenceController {
  constructor(private readonly oemReferenceService: OemReferenceService) {}

  @Post()
  create(@Body() createOemReferenceDto: CreateOemReferenceDto) {
    return this.oemReferenceService.create(createOemReferenceDto);
  }

  @Get()
  findAll() {
    return this.oemReferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oemReferenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOemReferenceDto: UpdateOemReferenceDto) {
    return this.oemReferenceService.update(+id, updateOemReferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oemReferenceService.remove(+id);
  }
}
