import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module.js';
import { LanguageSeedService } from './language/language-seed.service.js';
import { ArticleCategorySeedService } from './article-category/article-category-seed.service.js';
import { CountrySeedService } from './country/country-seed.service.js';
import { PmvCategorySeedService } from './pmv-category/pmv-category-seed.service.js';
import { ManufacturerSeedService } from './manufacturer/manufacturer-seed.service.js';
import { SupplierSeedService } from './supplier/supplier-seed.service.js';
import { ArticleReferenceSeedService } from './article-reference/article-reference-seed.service.js';
import { PmvModelSeedService } from './pmv-model/pmv-model-seed.service.js';

const seeders = {
  language: LanguageSeedService,
  country: CountrySeedService,
  pmvCategory: PmvCategorySeedService,
  manufacturer: ManufacturerSeedService,
  articleCategory: ArticleCategorySeedService,
  supplier: SupplierSeedService,
  articleReference: ArticleReferenceSeedService,
  //pmvModel: PmvModelSeedService,
};

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // Get the command-line argument (e.g., "role", "status", etc.)
  const args = process.argv.slice(2);
  const seedName = args[0]; // First argument after `npm run seed:run`

  if (seedName) {
    // Run only the specified seed
    const SeedService = seeders[seedName];
    if (!SeedService) {
      console.error(`❌ Seed "${seedName}" not found!`);
      await app.close();
      process.exit(1);
    }

    console.log(`🔹 Running seed: ${seedName}`);
    await app.get(SeedService).run();
  } else {
    // Run all seeders
    console.log(`🔹 Running all seeds...`);
    for (const key of Object.keys(seeders)) {
      await app.get(seeders[key]).run();
    }
  }

  await app.close();
  console.log('✅ Seeding complete.');
};

void runSeed();
