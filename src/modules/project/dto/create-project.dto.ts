import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ required: false, example: 'John Doe' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiProperty({ required: false, example: 'https://example.com/avatar.png' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  previewUrl?: string;

  @ApiProperty({
    required: false,
    example: JSON.stringify({
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      elements: [],
    }),
    description:
      'Canvas object as a JSON string. You can send it as an object; it will be serialized automatically.',
    type: 'string',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'string') return value;
    try {
      return JSON.stringify(value);
    } catch {
      return value; // Let IsJSON handle the error
    }
  })
  @IsJSON({ message: 'Canvas must be a valid JSON string' })
  canvas?: string;
}
