import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageService } from './language.service.js';
import { LanguageController } from './language.controller.js';
import { LanguageEntity } from './entities/language.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
