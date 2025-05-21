import { BadRequestException, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

import { ApiConfigService } from '@/config/api-config.service';

import { SocialInterface } from '../interface/social.interface';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;
  constructor(private readonly cs: ApiConfigService) {
    const config = this.cs.get('auth').google;
    this.google = new OAuth2Client(
      config.appId,
      config.appSecret,
      'postmessage',
    );
  }

  async getProfileByToken(
    loginDto: AuthGoogleLoginDto,
  ): Promise<SocialInterface> {
    const { tokens } = await this.google.getToken(loginDto.code);

    if (!tokens.id_token) {
      throw new BadRequestException('Invalid token');
    }
    const data = await this.google
      .verifyIdToken({
        idToken: tokens.id_token,
        audience: [this.cs.get('auth').google.appId],
      })
      .then((r) => r.getPayload());

    if (!data || !data.email || !data.sub || !data.given_name) {
      throw new BadRequestException('Invalid token');
    }

    return {
      id: data.sub,
      email: data.email,
      name: data.given_name,
    };
  }
}
