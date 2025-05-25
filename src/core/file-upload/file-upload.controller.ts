import {
  Controller,
  HttpStatus,
  InternalServerErrorException,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { Public } from '../../shared/decorators';
import { Prefix } from '../../shared/enums/prefix.enum';
import { UrlResponse } from '../auth/dto/url.dto';
import { IMG_ALLOWED_TYPES, IMG_MAX_SIZE } from './file-upload.contsants';
import { FileUploadService } from './file-upload.service';
import { UploadFileSizeValidator, UploadFileTypeValidator } from './validators';

@Controller(Prefix.FILE_UPLOAD)
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UrlResponse })
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
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadShare(
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
  ) {
    const uploadedFile = await this.fileUploadService.upload(preview);
    if (!uploadedFile) {
      throw new InternalServerErrorException('File upload failed');
    }

    return new UrlResponse(uploadedFile.location);
  }
}
