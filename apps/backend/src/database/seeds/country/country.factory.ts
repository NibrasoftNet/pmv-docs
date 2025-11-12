import { Injectable } from '@nestjs/common';
import { fakerFR } from '@faker-js/faker';
import { CountryEntity } from '../../../country/entities/country.entity.js';

@Injectable()
export class CountryFactory {
  generateRandom(): CountryEntity {
    return {
      currencyCode: fakerFR.finance.currencyCode(),
      isGroup: fakerFR.datatype.boolean(),
      isoCode2: fakerFR.location.countryCode('alpha-2'),
      isoCode3: fakerFR.location.countryCode('alpha-3'),
      isoCodeNo: fakerFR.number.int({ min: 100, max: 999 }),
      Description: fakerFR.location.country(),
    } as unknown as CountryEntity;
  }
}
