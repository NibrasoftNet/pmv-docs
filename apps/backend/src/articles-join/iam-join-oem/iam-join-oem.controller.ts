import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IamJoinOemService } from './iam-join-oem.service.js';
import { CreateIamJoinOemDto } from './dto/create-iam-join-oem.dto.js';
import { UpdateIamJoinOemDto } from './dto/update-iam-join-oem.dto.js';

@Controller('iam-join-oem')
export class IamJoinOemController {
  constructor(private readonly iamJoinOemService: IamJoinOemService) {}

  @Post()
  create(@Body() createIamJoinOemDto: CreateIamJoinOemDto) {
    return this.iamJoinOemService.create(createIamJoinOemDto);
  }

  @Get()
  findAll() {
    return this.iamJoinOemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iamJoinOemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIamJoinOemDto: UpdateIamJoinOemDto) {
    return this.iamJoinOemService.update(+id, updateIamJoinOemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iamJoinOemService.remove(+id);
  }
}
