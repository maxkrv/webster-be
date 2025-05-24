import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DatabaseService } from '../../core/db/database.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetManyProjectsDto } from './dto/get-many-projects.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginatedProjects } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getMy(userId: string, dto: GetManyProjectsDto) {
    const where: Prisma.ProjectWhereInput = {
      userId,
    };
    if (dto.search) {
      where.name = {
        contains: dto.search,
        mode: 'insensitive',
      };
    }

    const data = await this.databaseService.project.findMany({
      where,
      orderBy: {
        [dto.sortBy || 'createdAt']: dto.sortOrder || 'desc',
      },
      skip: (dto.page - 1) * dto.limit,
      take: dto.limit,
    });
    const count = await this.databaseService.project.count({
      where,
    });

    return new PaginatedProjects(data, count, dto);
  }

  async getById(userId: string, id: string) {
    return this.databaseService.project.findUnique({
      where: {
        id,
        userId,
      },
    });
  }

  async update(userId: string, id: string, body: UpdateProjectDto) {
    return this.databaseService.project.update({
      where: {
        id,
        userId,
      },
      data: body,
    });
  }

  async create(userId: string, body: CreateProjectDto) {
    return this.databaseService.project.create({
      data: {
        ...body,
        userId,
      },
    });
  }

  async delete(userId: string, id: string) {
    return this.databaseService.project.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
