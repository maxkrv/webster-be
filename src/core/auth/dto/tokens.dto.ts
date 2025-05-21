import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RefreshDto {
  @IsJWT()
  @ApiProperty({ example: 'shiovpm.sefdvssfv.ndsgfesdcv' })
  refreshToken: string;
}

export class Tokens extends RefreshDto {
  @IsJWT()
  @ApiProperty({ example: 'wrbesef.vrwsaefd.vwsefvs' })
  accessToken: string;

  constructor(accessToken: string, refreshToken: string) {
    super();
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
