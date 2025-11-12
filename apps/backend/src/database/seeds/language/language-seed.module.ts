import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LanguageSeedService } from './language-seed.service.js';
import { LanguageEntity } from '../../../language/entities/language.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  providers: [LanguageSeedService],
  exports: [LanguageSeedService],
})
export class LanguageSeedModule {}
