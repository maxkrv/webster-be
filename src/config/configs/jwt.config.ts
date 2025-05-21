import dotenv from 'dotenv';
import { z } from 'zod';

import { ConfigValidator } from '../config.validator';

dotenv.config();

const JwtConfigSchema = z.object({
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_TIME: z.string().default('15m'),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_TIME: z.string().default('14d'),
});

export type IJwtConfig = ReturnType<typeof getJwtConfig>;

export const getJwtConfig = () => {
  const config = ConfigValidator.validate(process.env, JwtConfigSchema);

  return {
    jwt: {
      accessToken: {
        secret: config.JWT_ACCESS_TOKEN_SECRET,
        time: config.JWT_ACCESS_TOKEN_TIME,
      },
      refreshToken: {
        secret: config.JWT_REFRESH_TOKEN_SECRET,
        time: config.JWT_REFRESH_TOKEN_TIME,
      },
    },
  };
};

export default getJwtConfig;
