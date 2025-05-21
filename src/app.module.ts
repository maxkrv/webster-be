import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { AppController } from './app.controller';
import { ApiConfigModule } from './config/api-config.module';
import { ApiConfigService } from './config/api-config.service';
import { CoreModule } from './core/core.module';
import { GlobalLogger } from './core/global/global.logger';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [ApiConfigModule, CoreModule, ModulesModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  requestLogger: GlobalLogger;

  constructor(private readonly acs: ApiConfigService) {
    this.requestLogger = new GlobalLogger('Request');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors({ credentials: true }), helmet()).forRoutes('*');
    if (!this.acs.isProduction())
      consumer
        .apply(
          morgan(getMorganCfg(), {
            stream: {
              write: (message) =>
                this.requestLogger.info(message.replace('\n', '')),
            },
          }),
        )
        .forRoutes('*');
  }
}

function getMorganCfg(): string {
  return '":method :url HTTP/:http-version" :remote-addr - :remote-user :status :res[content-length] - :response-time ms';
}
