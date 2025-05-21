import dotenv from 'dotenv';
import { z } from 'zod';

import { ConfigValidator } from '../config.validator';

dotenv.config();

const AwsSchema = z.object({
  AWS_S3_REGION: z.string(),
  AWS_S3_ACCESS_KEY_ID: z.string(),
  AWS_S3_SECRET_ACCESS_KEY: z.string(),
  AWS_PUBLIC_BUCKET_NAME: z.string(),
});

export type IAwsConfig = ReturnType<typeof getAwsConfig>;

const getAwsConfig = () => {
  const config = ConfigValidator.validate(process.env, AwsSchema);
  return {
    aws: {
      s3: {
        region: config.AWS_S3_REGION,
        keyId: config.AWS_S3_ACCESS_KEY_ID,
        secretKey: config.AWS_S3_SECRET_ACCESS_KEY,
        bucketName: config.AWS_PUBLIC_BUCKET_NAME,
      },
    },
  };
};
export default getAwsConfig;
