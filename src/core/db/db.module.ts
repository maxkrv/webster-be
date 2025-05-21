import { Module } from '@nestjs/common';

import { ApiConfigModule } from '../../config/api-config.module';
import { DbCronService } from '../cron/db-cron.service';
import { DatabaseService } from './database.service';

@Module({
  imports: [ApiConfigModule],
  exports: [DatabaseService],
  providers: [DatabaseService, DbCronService],
})
export class DatabaseModule {}
