import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EmailDto {
  @ApiProperty({ example: 'example@example.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
