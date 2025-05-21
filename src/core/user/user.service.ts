import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../db/database.service';
import { FileUploadService } from '../file-upload/file-upload.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async me(userId: string) {
    return this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getById(userId: string) {
    return this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async updateAvatar(userId: string, file: Express.Multer.File) {
    const { location: avatar } = await this.fileUploadService.upload(file);

    return await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar,
      },
    });
  }

  async update(userId: string, dto: UpdateUserDto) {
    return this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
  }
}
