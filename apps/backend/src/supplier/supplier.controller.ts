import { Controller } from '@nestjs/common';
import { SupplierService } from './supplier.service.js';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { implement, Implement } from '@orpc/nest';
import { contract } from '@workspace/orpc';
@AllowAnonymous()
@Controller()
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Implement(contract.supplier.list)
  listSuppliers(): any {
    return implement(contract.supplier.list).handler(async () => {
      return await this.supplierService.list();
    });
  }
}
