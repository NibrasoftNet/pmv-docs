import { Controller } from '@nestjs/common';
import { SupplierService } from './supplier.service.js';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}
}
