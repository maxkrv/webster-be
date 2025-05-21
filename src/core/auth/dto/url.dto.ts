import { ApiProperty } from '@nestjs/swagger';

export class UrlResponse {
  @ApiProperty({ example: 'https://example.com' })
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
