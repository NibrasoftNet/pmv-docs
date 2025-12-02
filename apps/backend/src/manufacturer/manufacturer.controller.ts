import { Controller } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { implement, Implement } from '@orpc/nest';
import { contract } from '@workspace/orpc';

@AllowAnonymous()
@Controller()
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Implement(contract.manufacturer.list)
  listManufacturers(): any {
    return implement(contract.manufacturer.list).handler(async () => {
      return await this.manufacturerService.list();
    });
  }
}
