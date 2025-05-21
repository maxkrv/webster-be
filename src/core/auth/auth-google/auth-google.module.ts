import { forwardRef, Module } from '@nestjs/common';

import { ApiConfigModule } from '../../../config/api-config.module';
import { AuthModule } from '../auth.module';
import { AuthGoogleController } from './auth-google.controller';
import { AuthGoogleService } from './auth-google.service';

@Module({
  imports: [ApiConfigModule, forwardRef(() => AuthModule)],
  providers: [AuthGoogleService],
  exports: [AuthGoogleService],
  controllers: [AuthGoogleController],
})
export class AuthGoogleModule {}
