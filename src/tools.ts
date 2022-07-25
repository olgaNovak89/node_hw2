import  { createLogger, format, transports } from 'winston';
import { Request } from 'express';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'your-service-name' },
  exitOnError: false,
  transports: [
    new transports.File({ filename: './logs/quick-start-error.log', level: 'error',
    format: format.json()}),
    new transports.File({ filename: './logs/quick-start-combined.log' })
  ],
  rejectionHandlers: [
    new transports.File({ filename: './logs/rejections.log' })
  ]
});
export const errorLogger = (req: Request, error: any)=> 
(
    logger.error(`${new Date()} ${req.url}: 
    req body: ${JSON.stringify(req.body)}, 
    req params: ${JSON.stringify(req.params)},
    error: ${JSON.stringify(error)}`)
    )

export function loggerTime (func: Function) {
        return async (...args) => {
        const stratTime = Date.now()    
        await func(...args)
        const executionTime = Date.now() - stratTime;
        console.log(`${func.name}: ${executionTime}ms`)
    }
  }