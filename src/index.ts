import  express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import logger from 'morgan';
import * as jwt from 'jsonwebtoken';
import cors from 'cors';
import '@/models/index';
import usersRouter from '@/routers/user';
import groupRouter from '@/routers/group';
import User from '@/models/user.model';
import { Response, Request, NextFunction } from 'express';
export const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const secret = process.env.SECRET || 'secret';
app.post('/authenticate', (req: Request, res: Response) => {
    const {login, password} = req.body;
    if (!login || !password) {
        return res.status(401).send({
            message: 'Login and password are required lo login.',
        })
    }
    User.findOne({where: {login: login}}).then(user => {
        if (!user) {
            return res.status(401).send({
                message: 'Wrong login/password combination.',
            })
        }
        const payload = { sub: user.id, login: login};
        const token = jwt.sign(payload, secret, { expiresIn: 120 });
        return res.json({token})
    })
})
const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({message: 'No token provided.'});
    }
    console.log(jwt.decode(token))
    jwt.verify(token
        // .replace('Bearer ', '')
        , secret, (err, decoded) => {
            console.log("decoded: ", decoded)
        if (err) {
            console.log(err)
            return res.status(403).send({message: 'Failed to authenticate token.'});
        }
        return next();
    })
};

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
