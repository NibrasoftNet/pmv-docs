import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module.js';
import { LanguageSeedService } from './language/language-seed.service.js';
import { CountrySeedService } from './country/country-seed.service.js';
import { PmvCategorySeedService } from './pmv-category/pmv-category-seed.service.js';
import { ManufacturerSeedService } from './manufacturer/manufacturer-seed.service.js';
import { ArticleCategorySeedService } from './article-category/article-category-seed.service.js';
import { SupplierSeedService } from './supplier/supplier-seed.service.js';
import { ArticleReferenceSeedService } from './article-reference/article-reference-seed.service.js';
import { PmvModelSeedService } from './pmv-model/pmv-model-seed.service.js';
import { PmvSubModelAutoSeedService } from './pmv-sub-model/pmv-sub-model-auto-seed.service.js';
import { PmvSubModelComSeedService } from './pmv-sub-model/pmv-sub-model-com-seed.service.js';
import { PmvSubModelMotoSeedService } from './pmv-sub-model/pmv-sub-model-moto-seed.service.js';
import { EngineSeedService } from './engine/engine-seed.service.js';
import { AutoSubModelJoinEngineSeedService } from './sub-model-join-engine/auto-sub-model-join-engine-seed.service.js';
import { ComSubModelJoinEngineSeedService } from './sub-model-join-engine/com-sub-model-join-engine-seed.service.js';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  const seedService = process.argv[2]; // Get the service name from the command-line argument

  if (!seedService) {
    // If no argument is provided, run all seed services
    await app.get(LanguageSeedService).run();
    await app.get(CountrySeedService).run();
    await app.get(PmvCategorySeedService).run();
    await app.get(ManufacturerSeedService).run();
    await app.get(ArticleCategorySeedService).run();
    await app.get(SupplierSeedService).run();
    await app.get(ArticleReferenceSeedService).run();
    await app.get(PmvModelSeedService).run();
    await app.get(PmvSubModelAutoSeedService).run();
    await app.get(PmvSubModelComSeedService).run();
    await app.get(PmvSubModelMotoSeedService).run();
    await app.get(EngineSeedService).run();
    await app.get(AutoSubModelJoinEngineSeedService).run();
    await app.get(ComSubModelJoinEngineSeedService).run();
    console.log('All seed services have been run.');
  } else {
    // If an argument is provided, run the specific seed service
    switch (seedService) {
      case 'language':
        await app.get(LanguageSeedService).run();
        console.log('LanguageSeedService has been run.');
        break;
      case 'country':
        await app.get(CountrySeedService).run();
        console.log('CountrySeedService has been run.');
        break;
      case 'pmv-category':
        await app.get(PmvCategorySeedService).run();
        console.log('PmvCategorySeedService has been run.');
        break;
      case 'manufacturer':
        await app.get(ManufacturerSeedService).run();
        console.log('ManufacturerSeedService has been run.');
        break;
      case 'article-category':
        await app.get(ArticleCategorySeedService).run();
        console.log('ArticleCategorySeedService has been run.');
        break;
      case 'supplier':
        await app.get(SupplierSeedService).run();
        console.log('SupplierSeedService has been run.');
        break;
      case 'article-reference':
        await app.get(ArticleReferenceSeedService).run();
        console.log('ArticleReferenceSeedService has been run.');
        break;
      case 'pmv-model':
        await app.get(PmvModelSeedService).run();
        console.log('PmvModelSeedService has been run.');
        break;
      case 'pmv-sub-model-auto':
        await app.get(PmvSubModelAutoSeedService).run();
        console.log('PmvSubModelAutoSeedService has been run.');
        break;
      case 'pmv-sub-model-com':
        await app.get(PmvSubModelComSeedService).run();
        console.log('PmvSubModelComSeedService has been run.');
        break;
      case 'pmv-sub-model-moto':
        await app.get(PmvSubModelMotoSeedService).run();
        console.log('PmvSubModelMotoSeedService has been run.');
        break;
      case 'engine':
        await app.get(EngineSeedService).run();
        console.log('EngineSeedService has been run.');
        break;
      case 'auto-sub-model-join-engine':
        await app.get(AutoSubModelJoinEngineSeedService).run();
        console.log('AutoSubModelJoinEngineSeedService has been run.');
        break;
      case 'com-sub-model-join-engine':
        await app.get(ComSubModelJoinEngineSeedService).run();
        console.log('ComSubModelJoinEngineSeedService has been run.');
        break;
      default:
        console.log(
          'Please specify a valid seed service.',
        );
    }
  }

  await app.close();
};

void runSeed();
