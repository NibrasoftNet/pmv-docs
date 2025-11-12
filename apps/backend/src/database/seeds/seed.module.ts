import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// DATASOURCE CONFIG
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from '../typeorm-config.service.js';
// ENV VARIABLES CONFIG
import appConfig from '../../config/app.config.js';
import databaseConfig from '../config/database.config.js';
// SEED MODULES
import { LanguageSeedModule } from './language/language-seed.module.js';
import { CountrySeedModule } from './country/country-seed.module.js';
import { PmvCategorySeedModule } from './pmv-category/pmv-category-seed.module.js';
import { ManufacturerSeedModule } from './manufacturer/manufacturer-seed.module.js';
import { ArticleCategorySeedModule } from './article-category/article-category-seed.module.js';
import { SupplierSeedModule } from './supplier/supplier-seed.module.js';
import { ArticleReferenceSeedModule } from './article-reference/article-reference-seed.module.js';
import { ArticleSeedModule } from './article/article-seed.module.js';
import { PmvModelSeedModule } from './pmv-model/pmv-model-seed.module.js';
import { PmvSubModelSeedModule } from './pmv-sub-model/pmv-sub-model-seed.module.js';

@Module({
  imports: [
    LanguageSeedModule,
    CountrySeedModule,
    PmvCategorySeedModule,
    ManufacturerSeedModule,
    ArticleCategorySeedModule,
    SupplierSeedModule,
    ArticleReferenceSeedModule,
    ArticleSeedModule,
    PmvModelSeedModule,
    PmvSubModelSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env.local'],
    }),
    TypeOrmModule.forRootAsync({
       useClass: TypeOrmConfigService,
       dataSourceFactory: async (options?: DataSourceOptions) => {
         if (!options) {
           throw new Error('DataSource options are required');
         }
         return new DataSource(options).initialize();
       },
    }),
  ],
})
export class SeedModule {}
