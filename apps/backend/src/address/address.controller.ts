import { Controller } from '@nestjs/common';
import { AddressService } from './address.service.js';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
}
