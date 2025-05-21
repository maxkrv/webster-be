import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import Redis from 'ioredis';

import { ApiConfigModule } from '../../config/api-config.module';
import { ApiConfigService } from '../../config/api-config.service';
import { DatabaseModule } from '../db/db.module';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({ global: true }),
    DatabaseModule,
    ApiConfigModule,
    MailModule,
    AuthGoogleModule,
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    MailService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: Redis,
      useFactory: async (configService: ApiConfigService) => {
        const redisConfig = configService.get('redis');
        return new Redis(redisConfig);
      },
      inject: [ApiConfigService],
    },
  ],
})
export class AuthModule {}
