import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { JwtPayload } from '../../core/auth/interface/jwt.interface';
import {
  IMG_ALLOWED_TYPES,
  IMG_MAX_SIZE,
} from '../../core/file-upload/file-upload.contsants';
import { FileUploadService } from '../../core/file-upload/file-upload.service';
import {
  UploadFileSizeValidator,
  UploadFileTypeValidator,
} from '../../core/file-upload/validators';
import { GetCurrentUser } from '../../shared/decorators';
import { IDDto } from '../../shared/dto/id.dto';
import { Prefix } from '../../shared/enums/prefix.enum';
import { PaginationOptionsDto } from '../../shared/pagination';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginatedProjects, ProjectEntity } from './project.entity';
import { ProjectService } from './project.service';

@ApiBearerAuth()
@Controller(Prefix.PROJECTS)
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Get('my')
  @ApiBearerAuth()
  @ApiOkResponse({ type: PaginatedProjects })
  async getProjects(
    @GetCurrentUser('sub') userId: string,
    @Query() query: PaginationOptionsDto,
  ) {
    return this.projectService.getMy(userId, query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProjectEntity })
  async getProjectById(
    @GetCurrentUser('sub') userId: string,
    @Query() { id }: IDDto,
  ) {
    return new ProjectEntity(await this.projectService.getById(userId, id));
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProjectEntity })
  async updateProject(
    @GetCurrentUser('sub') userId: string,
    @Query() { id }: IDDto,
    @Body() body: UpdateProjectDto,
  ) {
    return new ProjectEntity(
      await this.projectService.update(userId, id, body),
    );
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProjectEntity })
  async createProject(
    @GetCurrentUser('sub') userId: string,
    @Body() body: CreateProjectDto,
  ) {
    return new ProjectEntity(await this.projectService.create(userId, body));
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProjectEntity })
  async deleteProject(
    @GetCurrentUser('sub') userId: string,
    @Query() { id }: IDDto,
  ) {
    return new ProjectEntity(await this.projectService.delete(userId, id));
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ProjectEntity })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('preview'))
  @Patch(':id/preview')
  async updatePreview(
    @GetCurrentUser() { sub }: JwtPayload,
    @Query() { id }: IDDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new UploadFileTypeValidator({ fileType: IMG_ALLOWED_TYPES }),
        )
        .addValidator(new UploadFileSizeValidator({ maxSize: IMG_MAX_SIZE }))
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: true,
        }),
    )
    preview: Express.Multer.File,
  ): Promise<ProjectEntity> {
    const uploadedFile = await this.fileUploadService.upload(preview);

    return new ProjectEntity(
      await this.projectService.update(sub, id, {
        previewUrl: uploadedFile.location,
      }),
    );
  }
}
