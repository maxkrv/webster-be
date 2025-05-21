import { Controller, Get } from '@nestjs/common';

import { Public } from './shared/decorators';

@Controller()
export class AppController {
  @Get()
  @Public()
  getHello() {
    return {
      message:
        'Hello! This is the root endpoint. Please use /api for the API. Docs are available at /api/docs.',
    };
  }
}
