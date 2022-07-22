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

// export function logger (func: Function) {
//         return (...args) => {
//             try {
//             const date = new Date()
//             const fs = require('fs');
//             const dir = './logs';

//             if (!fs.existsSync(dir)){
//                 fs.mkdirSync(dir);
//             }
//             const fileName = `${dir}/logs-${date.getFullYear()}${date.getMonth()}${date.getDate()}.txt`
//             const req = [...args][0]
//             let argText = '\turl: ' + req.url + '\n' 
//             + '\tbody: ' + JSON.stringify(req.body) + '\n'
//             + '\tparams: ' + JSON.stringify(req.params) + '\n';
//             fs.appendFile(
//                 fileName, 
//                 `${new Date().toString()}` + ': \n\t'+
//                  'name: '+func.name.toString() + '\n' + argText, 
//                 function (err) {
//             if (err) throw err;
//             });}
//             catch (error) {
//                 console.log(error)
//             }
            
//         return func(...args)
//     }
