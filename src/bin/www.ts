#!/usr/bin/env node
 import 'module-alias';

 import debugModule from 'debug';
 const debug = debugModule('app-express:server');
 import http from 'http';
//  import express from 'express';
 import app from '../index';
// const app = express();
 const port = normalizePort(process.env.PORT || '3000');
 app.set('port', port);

 const server = http.createServer(app);
  // app.get('/', (req, res) => {res.json({message: 'hello'})})
 function normalizePort(val: string): number {
   const portNorm = parseInt(val, 10);
   const defaultPort = 3000;
   if (isNaN(portNorm)) {
     return defaultPort;
   }

   if (portNorm >= 0) {
     return portNorm;
   }

   return defaultPort;
 }

 function onError(error: any) {
   if (error.syscall !== 'listen') {
     throw error;
   }

   const bind = typeof port === 'string'
       ? 'Pipe ' + port
       : 'Port ' + port;

   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
      //  console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
      //  console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }

 /**
  * Event listener for HTTP server "listening" event.
  */

 function onListening() {
   const addr = server.address();
   const bind = typeof addr === 'string'
       ? 'pipe ' + addr
       : 'port ' + addr?.port || '';
   debug('Listening on ' + bind);
 }


 function runApp(portRun: number) {


   /**
    * Listen on provided port, on all network interfaces.
    */
   server.listen(portRun);
   server.on('error', onError);
   server.on('listening', onListening);
 }


 runApp(port);
export default server