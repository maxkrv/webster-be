import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { DbCronService } from './db-cron.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [DbCronService],
})
export class CronModule {}
