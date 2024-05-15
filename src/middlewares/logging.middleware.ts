import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {logger} from '../logger.service'; // Import your logger
import { v4 as uuidv4 } from 'uuid'

// @Injectable()
// export class LoggingMiddleware implements NestMiddleware {
export function LoggingMiddleware(req: Request, res: Response, next: NextFunction) {
    const { method, url, headers } = req;
    const id = uuidv4
    const userAgent = headers['user-agent'];
    logger.info(`${method} | ${url} | ${userAgent}`); // Log request details
    next();
}

