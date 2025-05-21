import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiConfigService } from './api-config.service';
import getAppConfig from './configs/app.config';
import getAuthConfig from './configs/auth.config';
import getAwsConfig from './configs/aws.config';
import getJwtConfig from './configs/jwt.config';
import getMailConfig from './configs/mail.config';
import getRedisConfig from './configs/redis.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        getAppConfig,
        getMailConfig,
        getJwtConfig,
        getAwsConfig,
        getRedisConfig,
        getAuthConfig,
      ],
    }),
  ],
  exports: [ApiConfigService],
  providers: [ApiConfigService],
})
export class ApiConfigModule {}
