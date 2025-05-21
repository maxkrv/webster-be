import { Module } from '@nestjs/common';

import { ApiConfigModule } from '../../config/api-config.module';
import { MailService } from './mail.service';

@Module({
  imports: [ApiConfigModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
