import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

import { ApiConfigService } from '../../config/api-config.service';
import { GlobalLogger } from './global.logger';

const UNKNOWN_EXCEPTION_MESSAGE = 'Something went wrong';

const formatZodIssue = (issue: ZodIssue): string => {
  return issue.path.length > 0
    ? `${issue.path.join('.')}: ${issue.message}`
    : issue.message;
};

export class ExceptionResponse {
  status: number;
  message: string;
  timestamp: string;
  method: string;
  path?: string;

  constructor(data: Partial<ExceptionResponse>) {
    Object.assign(this, data);
  }
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private static logger = new GlobalLogger(GlobalExceptionFilter.name);

  constructor(
    private readonly cs: ApiConfigService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const req = host.switchToHttp().getRequest<Request>();
    const res = host.switchToHttp().getResponse<Response>();

    const isProduction = this.cs.isProduction();
    const errorResponse = new ExceptionResponse({
      timestamp: new Date().toISOString(),
      method: httpAdapter.getRequestMethod(req),
      path: isProduction ? undefined : httpAdapter.getRequestUrl(req),
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: UNKNOWN_EXCEPTION_MESSAGE,
    });

    if (exception instanceof HttpException) {
      errorResponse.status = exception.getStatus();
      const err = exception.getResponse();
      errorResponse.message =
        typeof err === 'object' && 'message' in err
          ? err.message.toString()
          : err.toString();
    } else if (exception instanceof ZodError) {
      errorResponse.status = HttpStatus.BAD_REQUEST;
      errorResponse.message = exception.issues.map(formatZodIssue).join('; ');
    } else if (exception instanceof PrismaClientKnownRequestError) {
      errorResponse.status = HttpStatus.BAD_REQUEST;
      errorResponse.message = exception.message;
    } else if (exception instanceof Error) {
      if (!isProduction) {
        errorResponse.message = exception.message;
      }
      GlobalExceptionFilter.logger.error(
        `[${errorResponse.method} ${errorResponse.path ?? 'UNKNOWN'}] ${exception.message}`,
      );
    }

    httpAdapter.reply(res, errorResponse, errorResponse.status);
  }
}
