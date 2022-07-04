#!/usr/bin/env node
 import 'module-alias';

 import debugModule from 'debug';
 const debug = debugModule('app-express:server');
 import * as http from 'http';
 import app from '../index';
 const port = process.env.PORT || '3000';
 app.set('port', +port);

 const server = http.createServer(app);

 function onError(error: any) {
   if (error.syscall !== 'listen') {
     throw error;
   }

   const bind = typeof port === 'string'
       ? 'Pipe ' + port
       : 'Port ' + port;

   switch (error.code) {
     case 'EACCES':
       process.exit(1);
       break;
     case 'EADDRINUSE':
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


 runApp(+port);
 export default server
