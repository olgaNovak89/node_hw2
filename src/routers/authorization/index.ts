import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import User from '@/models/user.model';
const secret = process.env.SECRET || 'secret';

const router = express.Router();
router.post('/authenticate', (req: Request, res: Response) => {
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
        return res.send({token})
    })
})
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({message: 'No token provided.'});
    }
    jwt.verify(token.replace('Bearer ', '')
        , secret, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(403).send({message: 'Failed to authenticate token.'});
        }
        return next();
    })
};

export default router;
