import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { PasswordDto } from './password.dto';

export class ResetPasswordDto extends PasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
