import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationOptionsDto } from '../../../shared/pagination';

enum ProjectSortBy {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}
export class GetManyProjectsDto extends PaginationOptionsDto {
  @IsString()
  @IsOptional()
  search?: string;
  @IsOptional()
  @IsEnum(ProjectSortBy)
  sortBy?: ProjectSortBy;
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
