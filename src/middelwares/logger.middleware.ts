import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl, ip } = req;

    // Log request
    console.log(
      `[${new Date().toISOString()}] Request: ${method} ${originalUrl} - IP: ${ip}`,
    );

    // Capture response
    const originalSend = res.send;
    res.send = function (body: any) {
      const responseTime = Date.now() - startTime;
      const statusCode = res.statusCode;

      // Log response
      console.log(
        `[${new Date().toISOString()}] Response: ${method} ${originalUrl} - Status: ${statusCode} - Time: ${responseTime}ms`,
      );

      return originalSend.call(this, body);
    };

    next();
  }
}
