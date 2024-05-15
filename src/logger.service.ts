// // logger.service.ts

// import { Injectable, Logger } from '@nestjs/common';
// import * as winston from 'winston'

// @Injectable()
// export class LoggerService extends Logger {
//   private readonly logger: winston.Logger;

//   constructor() {
//     super();
//     this.logger = winston.createLogger({
//       level: 'info', // Set your desired log level
//       // format: combine(
//       //   timestamp(),
//       //   printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`),
//       // ),
//       transports: [
//         new winston.transports.Console()
//       ],
//     });
//   }

//   log(message: string, context?: string) {
//     this.logger.info(message, { context });
//   }

//   error(message: string, trace: string, context?: string) {
//     this.logger.error(message, { trace, context });
//   }
// }

import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level} | ${message}`;
});

export const logger = createLogger({
  format: combine(
    // label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});
// export default function createLogger(configService: ConfigService) {
//   return winston.createLogger({
//     level: configService.get('LOG_LEVEL', 'info'), // Set default log level
//     format: combine(
//       timestamp(),
//       console.log(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
//     ),
//     transports: [
//       new transports.Console(), // Log to console for development
//       new DailyRotateFile({
//         filename: 'logs/combined-%DATE%.log', // Customize filename and path
//         datePattern: 'YYYY-MM-DD',
//         zippedArchive: true, // Optionally compress old logs
//         maxSize: configService.get('LOG_MAX_SIZE', '20m'), // Max size of each log file
//         maxFiles: configService.get('LOG_MAX_FILES', '14d'), // Keep logs for 14 days
//       }),
//     ],
//   });
// }
// function combine(arg0: OperatorFunction<unknown, Timestamp<unknown>>, arg1: any): winston.Logform.Format {
//   throw new Error('Function not implemented.');
// }

