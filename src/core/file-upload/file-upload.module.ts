import { S3Client } from '@aws-sdk/client-s3';
import { Module } from '@nestjs/common';

import { ApiConfigModule } from '../../config/api-config.module';
import { ApiConfigService } from '../../config/api-config.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [ApiConfigModule],
  controllers: [FileUploadController],
  providers: [
    FileUploadService,
    {
      provide: S3Client,
      inject: [ApiConfigService],
      useFactory: (cs: ApiConfigService) => {
        const s3 = cs.get('aws.s3');

        return new S3Client({
          region: s3.region,
          credentials: {
            accessKeyId: s3.keyId,
            secretAccessKey: s3.secretKey,
          },
        });
      },
    },
  ],
  exports: [FileUploadService, S3Client],
})
export class FileUploadModule {}
