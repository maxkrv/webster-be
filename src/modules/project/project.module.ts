import { Module } from '@nestjs/common';

import { ApiConfigModule } from '../../config/api-config.module';
import { DatabaseModule } from '../../core/db/db.module';
import { FileUploadModule } from '../../core/file-upload/file-upload.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [ApiConfigModule, DatabaseModule, FileUploadModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
