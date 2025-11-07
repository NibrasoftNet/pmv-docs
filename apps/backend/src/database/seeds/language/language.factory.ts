import { Injectable } from '@nestjs/common';
import { fakerFR } from '@faker-js/faker';
import { LanguageEntity } from '../../../language/entites/language.entity.js';

@Injectable()
export class LanguageFactory {
  generateRandom(): LanguageEntity {
    return {
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      id: fakerFR.database.column(),
      name: fakerFR.location.county(),
      isoCode: fakerFR.location.county(),
      locale: fakerFR.location.county(),
      flagEmoji: fakerFR.location.countryCode('alpha-3'),
    } as unknown as LanguageEntity;
  }
}
