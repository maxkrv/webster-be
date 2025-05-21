import dotenv from 'dotenv';
import { z } from 'zod';

import { ConfigValidator } from '../config.validator';

dotenv.config();

const RedisConfigSchema = z.object({
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_HOST: z.string(),
  REDIS_PASS: z.string(),
  REDIS_USER: z.string(),
  REDIS_ROOT_PASS: z.string(),
});

export type IRedisConfig = ReturnType<typeof getRedisConfig>;

const getRedisConfig = () => {
  const config = ConfigValidator.validate(process.env, RedisConfigSchema);

  return {
    redis: {
      port: config.REDIS_PORT,
      host: config.REDIS_HOST,
      password: config.REDIS_PASS,
      username: config.REDIS_USER,
    },
  };
};

export default getRedisConfig;
