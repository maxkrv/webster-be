import dotenv from 'dotenv';
import { z } from 'zod';

import { Env } from '../config.interface';
import { ConfigValidator } from '../config.validator';

dotenv.config();

const AppSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.nativeEnum(Env).default(Env.PRODUCTION),
  SERVER_URL: z.string(),
  CLIENT_URL: z.string(),
  THROTTLE_TTL: z.coerce.number().default(10),
  THROTTLE_LIMIT: z.coerce.number().default(200),
});

export type IAppConfig = ReturnType<typeof getAppConfig>;

const getAppConfig = () => {
  const config = ConfigValidator.validate(process.env, AppSchema);

  return {
    app: {
      port: config.PORT,
      env: config.NODE_ENV,
      serverUrl: config.SERVER_URL,
      clientUrl: config.CLIENT_URL,
      throttle: {
        ttl: config.THROTTLE_TTL,
        limit: config.THROTTLE_LIMIT,
      },
    },
  };
};

export default getAppConfig;
