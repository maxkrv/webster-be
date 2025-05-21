import { Module } from '@nestjs/common';

import { ApiConfigModule } from '../config/api-config.module';
import { AuthModule } from './auth/auth.module';
import { CronModule } from './cron/cron.module';
import { DatabaseModule } from './db/db.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { GlobalModule } from './global/global.module';
import { HealthModule } from './health/health.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ApiConfigModule,
    GlobalModule,
    DatabaseModule,
    CronModule,
    MailModule,
    FileUploadModule,
    HealthModule,
    UserModule,
    AuthModule,
  ],
})
export class CoreModule {}
