import { ApiProperty } from '@nestjs/swagger';

export class Success {
  @ApiProperty({ example: true })
  success: boolean;

  constructor(success: boolean = true) {
    this.success = success;
  }
}
