// logger.service.ts

import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston'

@Injectable()
export class LoggerService extends Logger {
  private readonly logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      level: 'info', // Set your desired log level
      // format: combine(
      //   timestamp(),
      //   printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`),
      // ),
      transports: [
        new winston.transports.Console()
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, { trace, context });
  }
}
