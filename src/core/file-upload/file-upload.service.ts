import {
  DeleteObjectCommand,
  // ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { ApiConfigService } from '../../config/api-config.service';

@Injectable()
export class FileUploadService {
  private readonly bucketName: string;
  private readonly region: string;

  constructor(
    cs: ApiConfigService,
    private readonly s3Client: S3Client,
  ) {
    const aws = cs.get('aws');
    this.bucketName = aws.s3.bucketName;
    this.region = aws.s3.region;
  }

  async upload(file: Express.Multer.File) {
    const params = {
      Bucket: this.bucketName,
      Key: `${nanoid()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: ObjectCannedACL.public_read,
    };

    const command = new PutObjectCommand(params);
    await this.s3Client.send(command);

    return {
      key: params.Key,
      location: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${params.Key}`,
    };
  }

  uploadMany(files: Express.Multer.File[]) {
    const uploadPromises = files.map((file) => this.upload(file));

    return Promise.all(uploadPromises);
  }

  async delete(fileKey: string) {
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    const command = new DeleteObjectCommand(params);
    await this.s3Client.send(command);
  }

  deleteMany(fileKeys: string[]) {
    const promises = fileKeys.map((key) => this.delete(key));

    return Promise.all(promises);
  }
}
