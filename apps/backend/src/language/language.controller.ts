import { Controller } from '@nestjs/common';
import { LanguageService } from './language.service.js';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}
}
