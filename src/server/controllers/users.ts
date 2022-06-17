import UserModel from "../models/User.js";
// import {User as UserType } from '@/types';
import {v4 as uuid} from 'uuid';
import { Request, Response } from "express";
import { Op } from "sequelize";
import { usersSearchLimit } from "../../config.js";
import { schemaUser } from "../../schema.js";


export default {
    async create(req: Request, res: Response): Promise<any> {
        const userData = req.body;
        const validatedData = schemaUser.validate({...userData,
            id: uuid(),
            isDeleted: false}, { abortEarly: false });
        if (validatedData.error){
            res.status(400).send(validatedData.error);
        } else {
            return UserModel
            .create(validatedData)
            .then(user => res.status(201).send({message: 'New user is created', user}))
            .catch(error => res.status(400).send(error));
        }
    },

    async list(req: Request, res: Response): Promise<any> {
        const {login} = req.query;
        return UserModel
            .findAll({
                include: [{
                    model: UserModel,
                    as: 'Users',
                    where: { login: {
                        [Op.like]: `%${login}`
                    }}
                }],
                subQuery: true,
                limit: parseInt(req.query?.limit?.toString() || '', 1) || usersSearchLimit
            })
            .then(users => {
                if(users.length){
                    res.status(200).json(users)
                }
                else {
                    const message = `User with login similar to ${login} not found`;
                    res.status(404).json({message});
                }
            })
            .catch(error => res.status(400).send(error));
    },

    retrieve(req: Request, res: Response): Promise<any> {
        const { user_id } = req.params;
        return UserModel
            .findByPk(user_id, {
                include: [{
                    model: UserModel,
                    as: 'User',
                }],
            })
            .then(user => {
                console.log(user)
                // @ts-ignore
                if (!user || user?.isDeleted) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).json(user);
            })
            .catch(error => res.status(400).send(error));
    },

    async update(req: Request, res: Response): Promise<any> {
        const { user_id } = req.params;
        return UserModel
            .findByPk(user_id, {
                include: [{
                    model: UserModel,
                    as: 'User',
                }],
            })
            .then(user => {
                                // @ts-ignore

                if (!user || user.isDeleted) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                const userData = req.body;
                const validatedData = schemaUser.validate({...user,
                    ...userData
                }, { abortEarly: false });
                if (validatedData.error){
                    return res.status(404).json(validatedData.error);
                } else {

                return UserModel
                    .update(validatedData.value, {
                        where: {
                          id: user_id
                        }
                      })
                    .then(() => res.status(200).json(validatedData.value))
                    .catch((error) => res.status(400).send(error));
                }
            })
            .catch((error) => res.status(400).send(error));
    },

    async destroy(req: Request, res: Response): Promise<any> {
        const { user_id } = req.params;
        return UserModel
            .findByPk(user_id, {
                include: [{
                    model: UserModel,
                    as: 'User',
                }],
            })
            .then(user => {
                                // @ts-ignore

                if (!user || user.isDeleted) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                const userData = req.body;
                const validatedData = schemaUser.validate({...user,
                    isDeleted: true
                }, { abortEarly: false });
                if (validatedData.error){
                    return res.status(404).json(validatedData.error);
                } else {

                return UserModel
                    .update(validatedData.value, {
                        where: {
                          id: user_id
                        }
                      })
                    .then(() => res.status(200).json(validatedData.value))
                    .catch((error) => res.status(400).send(error));
                }
            })
            .catch((error) => res.status(400).send(error));
    },
};