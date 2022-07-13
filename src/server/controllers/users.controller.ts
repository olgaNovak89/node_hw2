import Users from '@/models/User.model';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { usersSearchLimit } from '@/config';
import { schemaUser } from '@/schema';

export const users =  {
    async create(req: Request, res: Response): Promise<any> {
        const userData = req.body;
        const validatedData = schemaUser.validate({...userData }, { abortEarly: false });
        if (validatedData.error) {
            res.status(400).send({...validatedData.error, message: 'Validation error'});
        } else {
            return Users
            .create(validatedData.value)
            .then(user => res.status(201).send({message: 'New user is created', user}))
            .catch(error => res.status(400).send({error: {user: validatedData.value, message: 'Error happened', ...error}}));
        }
    },

    async list(req: Request, res: Response): Promise<any> {
        const {login} = req.query;
        return Users
            .findAll({
                include: [{
                    model: Users,
                    as: 'Users',
                    where: { login: {
                        [Op.like]: `%${login}`,
                    }},
                }],
                subQuery: true,
                limit: parseInt(req.query?.limit?.toString() || '', 1) || usersSearchLimit,
            })
            .then((usersFound: Users[]) => {
                if (usersFound.length) {
                    res.status(200).json(usersFound)
                } else {
                    const message = `User with login similar to ${login} not found`;
                    res.status(404).json({message});
                }
            })
            .catch(error => res.status(400).send(error));
    },

    retrieve(req: Request, res: Response): Promise<any> {
        const { user_id } = req.params;
        return Users
            .findByPk(user_id, {
                include: [{
                    model: Users,
                    as: 'User',
                }],
            })
            .then(user => {
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
        return Users
            .findOne({where: {id: user_id}})
            .then(user => {
                if (!user || user.isDeleted) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                const userData = req.body;
                const validatedData = schemaUser.validate(userData
                , { abortEarly: false });
                if (validatedData.error) {
                    return res.status(404).json(validatedData.error);
                } else {

                return Users
                    .update(validatedData.value, {
                        where: {
                          id: user_id,
                        },
                      })
                    .then(() => res.status(200).json(validatedData.value))
                    .catch((error) => res.status(400).send(error));
                }
            })
            .catch((error) => res.status(400).send(error));
    },

    async destroy(req: Request, res: Response): Promise<any> {
        const { user_id } = req.params;
        return Users
        .findOne({where: {id: user_id}})
            .then(user => {
                if (!user || user.isDeleted) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return Users
                    .update({isDeleted: true},
                        {where: {
                          id: user_id,
                        }}, )
                    .then(() => res.status(200).json({message: `User ${user_id} is deleted` }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};