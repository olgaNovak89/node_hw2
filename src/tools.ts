import  { createLogger, format, transports } from 'winston';
import { Request } from 'express';

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'your-service-name' },
  exitOnError: false,
  transports: [
    new transports.File({ filename: './logs/quick-start-error.log', level: 'error',
    format: format.json()}),
    new transports.File({ filename: './logs/quick-start-combined.log' }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: './logs/rejections.log' }),
  ],
});
export const errorLogger = (req: Request, error: any) =>
(
    logger.error(`${new Date()} ${req.url}:
    req body: ${JSON.stringify(req.body)},
    req params: ${JSON.stringify(req.params)},
    error: ${JSON.stringify(error)}`)
    )

export function loggerTime (func: Function) {
        return async (...args) => {
          const stratTime = Date.now()
          try {

        await func(...args)
        console.log(`${func.name}:  ${args[0]?.url},
            body: ${JSON.stringify(args[0]?.body)},
            params: ${JSON.stringify(args[0]?.params)}`)
        } catch (error) {
          console.log(`${func.name}:  ${args[0]?.url},
            body: ${JSON.stringify(args[0]?.body)},
            params: ${JSON.stringify(args[0]?.params)},
            error: ${JSON.stringify(error)}
            `)
        } finally {
        const executionTime = Date.now() - stratTime;
        console.log(`${func.name} execution time: ${executionTime}ms`)
      }
    }
  }
