#!/usr/bin/env node
import 'module-alias/register';
import debugModule from 'debug';
const debug = debugModule('app-express:server');
import * as http from 'http';
import app from './index';
import * as dotenv from 'dotenv';
dotenv.config();
const port = +(process.env.PORT || '3007');
app.set('port', port);

const server = http.createServer(app);

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
  console.log('listening on port ' + port)
  const addr = server.address();
  const bind = typeof addr === 'string'
       ? 'pipe ' + addr
       : 'port ' + addr?.port || '';
  debug('Listening on ' + bind);
 }


function runApp(portRun: number) {

  console.log(portRun)
   /**
    * Listen on provided port, on all network interfaces.
    */
  server.listen(portRun);
  server.on('error', onError);
  server.on('listening', onListening);
 }


runApp(port);
export default server
