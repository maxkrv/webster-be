import dotenv from 'dotenv';
import { z } from 'zod';

import { ConfigValidator } from '../config.validator';

dotenv.config();

const AuthConfigSchema = z.object({
  AUTH_GOOGLE_APP_ID: z.string(),
  AUTH_GOOGLE_APP_SECRET: z.string(),
  AUTH_GOOGLE_CALLBACK: z.string(),
});

export type IAuthConfig = ReturnType<typeof getAuthConfig>;

const getAuthConfig = () => {
  const config = ConfigValidator.validate(process.env, AuthConfigSchema);
  return {
    auth: {
      google: {
        appId: config.AUTH_GOOGLE_APP_ID,
        appSecret: config.AUTH_GOOGLE_APP_SECRET,
        callback: config.AUTH_GOOGLE_CALLBACK,
      },
    },
  };
};
export default getAuthConfig;
