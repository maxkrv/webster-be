import { LoggerService } from '@nestjs/common';
import chalk from 'chalk';

import { Env } from '../../config/config.interface';
import getAppConfig from '../../config/configs/app.config';

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  LOG = 'LOG',
}

export class GlobalLogger implements LoggerService {
  private readonly isDevelopment: boolean;

  constructor(private readonly context: string = GlobalLogger.name) {
    this.isDevelopment = getAppConfig().app.env === Env.DEVELOPMENT;
  }

  private static getCurrentTimestamp(): string {
    return new Date().toISOString().replace('T', ' ').split('.')[0]; // Format: YYYY-MM-DD HH:mm:ss
  }

  private static formatMessage(
    level: LogLevel,
    message: string,
    context: string,
    isDevelopment: boolean,
  ): string {
    const timestamp = `[${GlobalLogger.getCurrentTimestamp()}]`;
    const levelTag = `[${level}]`.padEnd(7);
    const appTag = `[APP]`;
    const contextTag = `[${context}]`;
    const separator = ' → ';

    if (!isDevelopment) {
      return `${timestamp} ${levelTag} ${appTag} ${contextTag}${separator}${message}`;
    }

    const colorize =
      {
        INFO: chalk.green,
        WARN: chalk.yellow,
        ERROR: chalk.red,
        LOG: chalk.cyan,
      }[level] || chalk.reset;

    return (
      chalk.gray(timestamp) +
      colorize(` ${levelTag} `) +
      chalk.blueBright(appTag) +
      chalk.magenta(` ${contextTag}`) +
      chalk.gray(separator) +
      message
    );
  }

  private logMessage(level: LogLevel, message: string) {
    console.log(
      GlobalLogger.formatMessage(
        level,
        message,
        this.context,
        this.isDevelopment,
      ),
    );
  }

  log(message: string) {
    this.logMessage(LogLevel.LOG, message);
  }

  info(message: string) {
    this.logMessage(LogLevel.INFO, message);
  }

  warn(message: string) {
    this.logMessage(LogLevel.WARN, message);
  }

  error(message: string) {
    this.logMessage(LogLevel.ERROR, message);
  }

  // Static Methods
  static log(message: string, context: string = GlobalLogger.name) {
    GlobalLogger.print(LogLevel.LOG, message, context);
  }

  static info(message: string, context: string = GlobalLogger.name) {
    GlobalLogger.print(LogLevel.INFO, message, context);
  }

  static warn(message: string, context: string = GlobalLogger.name) {
    GlobalLogger.print(LogLevel.WARN, message, context);
  }

  static error(message: string, context: string = GlobalLogger.name) {
    GlobalLogger.print(LogLevel.ERROR, message, context);
  }

  private static print(level: LogLevel, message: string, context: string) {
    const isDevelopment = getAppConfig().app.env === Env.DEVELOPMENT;
    console.log(
      GlobalLogger.formatMessage(level, message, context, isDevelopment),
    );
  }

  static getLogger(context: string): GlobalLogger {
    return new GlobalLogger(context);
  }
}
