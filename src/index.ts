import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as cors from 'cors';
import '@/models/index';
import usersRouter from '@/routers/user';
import groupRouter from '@/routers/group';
import authRouter, { checkToken } from '@/routers/authorization';
export const app = express();

app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', authRouter);
app.use('/user', checkToken, usersRouter);
app.use('/group', checkToken, groupRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({message: 'Internal server error', error: err});
    next();
});
process.on('uncaughtException', (error) => {
    console.error( error);
    process.exit(1);
 });

export default app;
