import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Project } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import {
  ClassTransformOptions,
  plainToClassFromExist,
  Type,
} from 'class-transformer';

import { BaseEntity } from '../../shared/base/base.entity';
import { Paginated } from '../../shared/pagination';

export class ProjectDescription implements Project {
  @ApiProperty({ example: 'qwcqwdocq12djq2ewff232' })
  id: string;
  @ApiProperty({ example: 'John Doe' })
  name: string;
  @ApiProperty({ example: 'https://example.com/avatar.png' })
  previewUrl: string | null;

  @ApiProperty({
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
  canvas: JsonValue | null;

  @ApiProperty({ example: 'qwcqwdocq12djq2ewff232' })
  userId: string;
  @ApiProperty({ example: '2025-04-02T16:27:17Z' })
  createdAt: Date;
  @ApiProperty({ example: '2025-04-02T16:27:17Z' })
  updatedAt: Date;
}

export class ProjectRelations {}

export class ProjectEntity
  extends IntersectionType(ProjectDescription, ProjectRelations)
  implements BaseEntity
{
  constructor(data: Project, options?: ClassTransformOptions) {
    super();
    plainToClassFromExist(this, data, options);
  }
}

export class PaginatedProjects extends Paginated<ProjectEntity> {
  @Type(() => ProjectEntity)
  @ApiProperty({ type: () => ProjectEntity, isArray: true })
  declare items: ProjectEntity[];
}
