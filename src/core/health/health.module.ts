import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { ApiConfigModule } from '../../config/api-config.module';
import { DatabaseModule } from '../db/db.module';
import { GlobalLogger } from '../global/global.logger';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: GlobalLogger,
      errorLogStyle: 'pretty',
    }),
    HttpModule,
    DatabaseModule,
    ApiConfigModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
