import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type.js';

@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dns: HttpHealthIndicator,
    private database: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private configService: ConfigService<AllConfigType>,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      async () => await this.dns.pingCheck('google', 'https://www.google.com'),
      async () => await this.database.pingCheck('postgres', { timeout: 10000 }),
      async () => await this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => await this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
    ]);
  }

  @Get('info')
  appInfo() {
    return { name: this.configService.get('app.name', { infer: true }) };
  }
}
