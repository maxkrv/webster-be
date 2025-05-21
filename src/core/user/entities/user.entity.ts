import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { AuthProviderType, User } from '@prisma/client';
import {
  ClassTransformOptions,
  Exclude,
  plainToClassFromExist,
  Type,
} from 'class-transformer';

import { BaseEntity } from '../../../shared/base/base.entity';
import { Paginated } from '../../../shared/pagination';

export class UserDescription implements User {
  @ApiProperty({ example: 'qwcqwdocq12djq2ewff232' })
  id: string;
  @ApiProperty({ example: 'John Doe' })
  name: string;
  @ApiProperty({ example: 'micha21cloz@gmail.com' })
  email: string;
  @Exclude()
  password: string;
  @ApiProperty({ example: 'https://example.com/avatar.png' })
  avatar: string;
  @ApiProperty({ example: true })
  emailVerified: boolean;
  @ApiProperty({ example: '2025-04-02T16:27:17Z' })
  createdAt: Date;
  @Exclude()
  @ApiProperty({ example: '2025-04-02T16:27:17Z' })
  updatedAt: Date;
  @ApiProperty({ enum: AuthProviderType })
  authProvider: AuthProviderType;
}

export class UserRelations {}

export class UserEntity
  extends IntersectionType(UserDescription, UserRelations)
  implements BaseEntity
{
  constructor(data: User, options?: ClassTransformOptions) {
    super();
    plainToClassFromExist(this, data, options);
  }
}

export class PaginatedUsers extends Paginated<User> {
  @Type(() => UserEntity)
  @ApiProperty({ type: () => UserEntity, isArray: true })
  declare items: User[];
}
