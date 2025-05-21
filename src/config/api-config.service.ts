import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env, FieldKeyType, FieldType, IConfig } from './config.interface';

@Injectable()
export class ApiConfigService {
  constructor(private readonly cs: ConfigService<IConfig>) {}
  public getEnv() {
    return this.get('app.env');
  }

  public getPort() {
    return this.get('app.port');
  }

  public isDevelopment(): boolean {
    return this.getEnv() === Env.DEVELOPMENT;
  }

  public isProduction(): boolean {
    return this.getEnv() === Env.PRODUCTION;
  }

  public isTest(): boolean {
    return this.getEnv() === Env.TEST;
  }

  public get<T extends FieldKeyType<IConfig>>(key: T): FieldType<IConfig, T> {
    const varbl = this.cs.get(key, {
      infer: true,
    });
    if (!varbl) throw new Error('Variables not defined');
    return varbl as FieldType<IConfig, T>;
  }
}

export const acs = new ApiConfigService(new ConfigService());
