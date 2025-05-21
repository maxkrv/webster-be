import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { IDDto } from '@/shared/dto/id.dto';

import { GLOBAL_PREFIX } from '../enums/prefix.enum';

export class Swagger {
  public static createDocument(app: NestExpressApplication) {
    const cfg = Swagger.getConfig().build();

    return SwaggerModule.createDocument(app, cfg, {
      extraModels: [IDDto],
    });
  }

  private static getConfig(): DocumentBuilder {
    return new DocumentBuilder()
      .setTitle('Design creating tool API')
      .setDescription(
        'Webster is a design tool API that provides a backend solution for managing design projects, assets, and collaboration. It is built using TypeScript and Nest.js, ensuring a robust and scalable architecture. The API supports user authentication, project management, asset storage. ',
      )
      .setVersion('1.0')
      .setLicense('LICENSE', 'https://github.com/mkloz/webster-backend')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      });
  }

  public static setup(app: NestExpressApplication) {
    SwaggerModule.setup(
      `/${GLOBAL_PREFIX}/docs`,
      app,
      Swagger.createDocument(app),
      {
        customSiteTitle: 'Webster API Docs',
        customfavIcon: '/api/assets/logo.svg',
      },
    );
  }
}
