import path from 'path';
import { fileURLToPath } from 'url';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service.js';
import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
// ENV CONFIG
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './database/config/database.config.js';
import fileConfig from './files/config/file.config.js';
import appConfig from './config/app.config.js';
import mailConfig from './mail/config/mail.config.js';
import { AllConfigType } from './config/config.type.js';
// ORPC
import { ORPCModule } from '@orpc/nest';
import { ZodValidationPipe, ZodSerializerInterceptor } from 'nestjs-zod';
import { HttpExceptionFilter } from './utils/filters/http-exception.filter.js';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
// SHARED MODULES
import { MinioModule } from './utils/minio/minio.module.js';
import { MulterConfigModule } from './shared/multer-config.module.js';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { auth } from './auth.js';
// PROJECT MODULES
import { TodosModule } from './todos/todos.module.js';
import { FilesModule } from './files/files.module.js';
import { MailModule } from './mail/mail.module.js';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { LanguageModule } from './language/language.module.js';
import { CountryModule } from './country/country.module.js';
import { PmvCategoryModule } from './pmv-category/pmv-category.module.js';
import { ManufacturerModule } from './manufacturer/manufacturer.module.js';
import { ArticleCategoryModule } from './article-category/article-category.module.js';
import { AddressModule } from './address/address.module.js';
import { SupplierModule } from './supplier/supplier.module.js';
import { ArticleReferenceModule } from './article-reference/article-reference.module.js';
import { IamReferenceModule } from './articles/iam-reference/iam-reference.module.js';
import { PmvModelModule } from './pmv-model/pmv-model.module.js';
import { PmvSubModelModule } from './pmv-sub-model/pmv-sub-model.module.js';
import { EngineModule } from './engine/engine.module.js';
import { SubModelJoinEngineModule } from './sub-model-join-engine/sub-model-join-engine.module.js';
import { OemReferenceModule } from './articles/oem-reference/oem-reference.module.js';
import { EanReferenceModule } from './articles/ean-reference/ean-reference.module.js';
import { IamJoinOemModule } from './articles-join/iam-join-oem/iam-join-oem.module.js';
import { IamJoinEanModule } from './articles-join/iam-join-ean/iam-join-ean.module.js';
import { IamJoinSubModelModule } from './articles-join/iam-join-sub-model/iam-join-sub-model.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, fileConfig, appConfig, mailConfig],
      envFilePath: ['.env'],
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
    ORPCModule.forRootAsync({
      useFactory: () => ({
        context: (req: Request, res: Response) => ({
          request: req,
          response: res,
        }),
      }),
    }),
    AuthModule.forRoot({ auth }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    MinioModule,
    MulterConfigModule,
    TodosModule,
    FilesModule,
    MailModule,
    LanguageModule,
    CountryModule,
    PmvCategoryModule,
    ManufacturerModule,
    ArticleCategoryModule,
    AddressModule,
    SupplierModule,
    ArticleReferenceModule,
    IamReferenceModule,
    PmvModelModule,
    PmvSubModelModule,
    EngineModule,
    SubModelJoinEngineModule,
    OemReferenceModule,
    EanReferenceModule,
    IamJoinOemModule,
    IamJoinEanModule,
    IamJoinSubModelModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
