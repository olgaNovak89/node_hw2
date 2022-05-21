import { User } from "./types";
import { schemaUser } from "./schema";
import {v4 as uuid} from 'uuid';
import express, { Request, Response, NextFunction } from 'express'
const app = express();
const port = 3030;
app.use(express.json());

const users: User[] = [];

app.get('/user/:user_id',  (req: Request, res: Response) => {
    const { user_id } = req.params;
    const user = users.find(el => el.id === user_id && !el.isDeleted);
    if (user) {
        const {isDeleted: omit, ...userToReturn} = user;
        res.json(userToReturn);
    } else {
        const message = user ? `User with ID ${user_id} was deleted` :`User with ID ${user_id} not found`;
        res.status(404).json({message});
    }
});

app.delete('/user/:user_id',  (req: Request, res: Response) => {
    const { user_id } = req.params;
    const user = users.find(el => el.id === user_id && !el.isDeleted);
    if (user) {
        const message = `User with ID ${user_id} was deleted`;
        res.json({message});
    } else {
        const message = `Error happened. User with ID ${user_id} was not deleted`;
        res.status(404).json({message});
    }
});

app.put('/user/:user_id',  (req: Request, res: Response) => {
    const { user_id } = req.params;
    let user = users.find(el => el.id === user_id && !el.isDeleted);
    if (user) {
        const userData = req.body;
        const validatedData = schemaUser.validate({...user,
            ...userData
        }, { abortEarly: false });
        if (validatedData.error){
            res.status(404).json(validatedData.error);
        } else {
            user = validatedData.value;
            const {isDeleted: omit, ...userToReturn} = validatedData.value;
            // tslint:disable-next-line
            console.log(users)
            res.json({message: `New with ID ${user_id} was modified`, user: userToReturn})
        };
    } else {
        const message = user ? `User with ID ${user_id} was deleted` :`User with ID ${user_id} not found`;
        res.status(404).json({message});
    }
});

app.post('/user', (req: Request, res: Response) =>  {
    const userData = req.body;
    const validatedData = schemaUser.validate({...userData,
        id: uuid(),
        isDeleted: false}, { abortEarly: false });
    if (validatedData.error){
        res.status(404).json(validatedData.error);
    } else {
        users.push(validatedData.value);
        const {isDeleted: omit, ...userToReturn} = validatedData.value
        res.json({message: 'New user is created', user: userToReturn})
    };
});
app.listen(port ,() => {
    // console.error(`Example app listening on port ${port}`)
  });
