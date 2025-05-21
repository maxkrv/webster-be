import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';

import { ApiConfigService } from '../../config/api-config.service';
import { Public } from '../../shared/decorators';
import { GLOBAL_PREFIX, Prefix } from '../../shared/enums/prefix.enum';
import { DatabaseService } from '../db/database.service';
import { HealthCheck } from './health.decorator';

@ApiTags('Healthcheck')
@ApiBearerAuth()
@Controller(Prefix.HEALTH)
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: PrismaHealthIndicator,
    private cs: ApiConfigService,
    private prisma: DatabaseService,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({ summary: 'Get state of api. [open for: everyone]' })
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'backend',
          `${this.cs.get('app.serverUrl')}/${GLOBAL_PREFIX}/${Prefix.HEALTH}/ok`,
        ),
      () => this.db.pingCheck('database', this.prisma),
      () =>
        this.disk.checkStorage('disk', {
          path: '/',
          thresholdPercent: 0.95,
        }),
    ]);
  }

  @Get('frontend')
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({ summary: 'Get state of frontend. [open for: everyone]' })
  @HealthCheck()
  checkFrontend() {
    return this.health.check([
      () => this.http.pingCheck('frontend', this.cs.get('app.clientUrl')),
    ]);
  }

  @Get('ok')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get callback from backend. [open for: everyone]' })
  ok() {
    return { ok: true };
  }
}
