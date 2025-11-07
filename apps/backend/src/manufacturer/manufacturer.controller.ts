import { Controller } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service.js';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}
}