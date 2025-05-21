import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class PasswordDto {
  @ApiProperty({ example: 'Pass123@' })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MaxLength(100)
  password: string;
}
