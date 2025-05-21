import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { join } from 'path';

import { AppModule } from './app.module';
import { ApiConfigService } from './config/api-config.service';
import { GlobalLogger } from './core/global/global.logger';
import { GLOBAL_PREFIX, Prefix } from './shared/enums/prefix.enum';
import { Swagger } from './shared/utils/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bodyParser: true,
  });
  const logger = app.get(GlobalLogger);
  const cs = app.get(ApiConfigService);
  const port = cs.getPort();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useLogger(logger);
  app.setGlobalPrefix(GLOBAL_PREFIX, { exclude: ['/'] });
  app.useStaticAssets(join(process.cwd(), 'assets'), {
    prefix: `/${GLOBAL_PREFIX}/${Prefix.ASSETS}`,
  });

  if (cs.isDevelopment()) {
    Swagger.setup(app);
  }

  await app.listen(port, () => {
    logger.log(`Server is running on port ${port}`);
  });
}

bootstrap();
