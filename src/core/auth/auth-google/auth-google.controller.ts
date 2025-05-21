import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthProviderType } from '@prisma/client';

import { Public } from '../../../shared/decorators';
import { Prefix } from '../../../shared/enums/prefix.enum';
import { AuthService } from '../auth.service';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';

@Controller(Prefix.AUTH_GOOGLE)
export class AuthGoogleController {
  constructor(
    private readonly authService: AuthService,
    private readonly authGoogleService: AuthGoogleService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: AuthGoogleLoginDto) {
    const socialData = await this.authGoogleService.getProfileByToken(loginDto);

    return this.authService.validateSocialLogin(
      AuthProviderType.GOOGLE,
      socialData,
    );
  }
}
