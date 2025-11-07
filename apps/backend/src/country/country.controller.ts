import { Controller } from '@nestjs/common';
import { CountryService } from './country.service.js';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}
}
