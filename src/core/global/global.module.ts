import { createKeyv, Keyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheableMemory } from 'cacheable';

import { ApiConfigModule } from '../../config/api-config.module';
import { ApiConfigService } from '../../config/api-config.service';
import { GlobalExceptionFilter } from './global.filter';
import { GlobalLogger } from './global.logger';

@Global()
@Module({
  imports: [
    ApiConfigModule,
    ThrottlerModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (cs: ApiConfigService) => ({
        throttlers: [cs.get('app').throttle],
      }),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (acs: ApiConfigService) => {
        const redis = acs.get('redis');
        return {
          stores: [
            createKeyv(
              `redis://${redis.username}:${redis.password}@${redis.host}:${redis.port}`,
            ),
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
          ],
        };
      },
      inject: [ApiConfigService],
    }),
  ],
  exports: [GlobalLogger],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
    {
      provide: GlobalLogger,
      useValue: new GlobalLogger('Global'),
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          validateCustomDecorators: true,
          whitelist: true,
        }),
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class GlobalModule {}
