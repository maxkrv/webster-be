import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IDDto {
  @ApiProperty({ example: 'ckaqbclqnwqwfewgwsef' })
  @IsString()
  id: string;
}
