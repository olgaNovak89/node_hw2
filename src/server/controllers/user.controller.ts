import User from '@/models/user.model';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { usersSearchLimit } from '@/config';
import { schemaUser, schemaUserToGroup } from '@/schema';
import db from '../models';
import UserToGroup from '@/models/user_to_group.model';
import Group from '@/models/group.model';
import { errorLogger } from '@/tools';

export const user =  {
    async create(req: Request, res: Response): Promise<any> {
        const userData = req.body;
        const validatedData = schemaUser.validate({...userData }, { abortEarly: false });
        if (validatedData.error) {
            errorLogger(req, validatedData.error)
            res.status(400).send({...validatedData.error, message: 'Validation error'});
        } else {
            return User
            .create(validatedData.value)
            .then(userRetreived => res.status(201).send({message: 'New user is created', userRetreived}))
            .catch(error => {
                errorLogger(req, error);
                res.status(400).send({error:
                    {
                        user: validatedData.value,
                        message: 'Error happened', ...error,
                    },
                })
            });
        }
    },

    async list(req: Request, res: Response): Promise<any> {
        const {login} = req.query;
        return User
            .findAll({

                    where: { login: {
                        [Op.like]: `%${login}%`,

                    },
                    isDeleted: false,
                },
                subQuery: true,
                limit: parseInt(req.query?.limit?.toString() || '', 1) || usersSearchLimit,
            })
            .then((usersFound: User[]) => {
                if (usersFound.length) {
                    res.status(200).json(usersFound)
                } else {
                    errorLogger(req, 'Users not found')
                    const message = `User with login similar to ${login} not found`;
                    res.status(404).json({message});
                }
            })
            .catch(error => {
                errorLogger(req, error);
                res.status(400).send(error);
            });
    },

    retrieve(req: Request, res: Response): Promise<any> {
        const { user_id } = req.params;

        return User
            .findOne({where: { id: user_id, isDeleted: false}})
            .then(userRetreived => {
                if (!userRetreived) {
                    errorLogger(req, 'User not found');
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).json(userRetreived);
            })
            .catch(error => {
                errorLogger(req, error);
                res.status(400).send(error);
            });
    },

    async update(req: Request, res: Response): Promise<any> {
        const { user_id } = req.params;
        return User
            .findOne({where: {id: user_id, isDeleted: false}})
            .then(userRetreived => {
                if (!userRetreived) {
                    errorLogger(req, 'User not found');
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                const userData = req.body;
                const validatedData = schemaUser.validate(userData
                , { abortEarly: false });
                if (validatedData.error) {
                    errorLogger(req, validatedData.error);
                    return res.status(404).json(validatedData.error);
                } else {

                return User
                    .update(validatedData.value, {
                        where: {
                          id: user_id,
                        },
                      })
                    .then(() => res.status(200).json({...user, ...validatedData.value}))
                    .catch((error) => {
                        errorLogger(req, error);
                        res.status(400).send(error);
                    });
                }
            })
            .catch((error) => {
                errorLogger(req, error);
                res.status(400).send(error);
            });
    },

    async destroy(req: Request, res: Response): Promise<any> {
        const { user_id } = req.params;
        if (!user_id) {
            errorLogger(req, 'No ID')
            return res.status(404).send({
                message: 'User IDis required',
            });
        }
        const userRetreived = await User
                .findOne({where: {id: user_id, isDeleted: false}});

        if (!userRetreived) {
            errorLogger(req, 'User not found');
            return res.status(404).send({
                message: 'User Not Found',
            });
        }
        const t = await db.sequelize.transaction();
        try {
            User
            .update(
                {isDeleted: true},
                {
                    where: {
                      id: user_id,
                    },
                    transaction: t,
                },
            )
            await UserToGroup
            .destroy(
                {
                    where: {
                        userId: user_id,
                    },
                    transaction: t,
                }).then(
                count =>
                console.log(
                    `${count} records were deleted from UserToGroup`,
                ))
            await t.commit();
            res.status(200).json({message: `User ${user_id} is deleted` })
        } catch (error) {
            await t.rollback();
            errorLogger(req, error);
            res.status(400).send({message: error});
        }
    },
    async addUserToGroup(req: Request, res: Response): Promise<any> {
        const { group_id , user_id } = req.params;
        const validatedData = schemaUserToGroup.validate(
            {groupId: group_id, userId: user_id}, { abortEarly: false },
        );
        if (validatedData.error) {
            errorLogger(req, validatedData.error);
            res.status(400).send({...validatedData.error, message: 'Validation error'});
        } else {
            const t = await db.sequelize.transaction();
            try {
                const userRetreived = await User.findOne({where: { id: user_id }});
                const group = await Group.findOne({where: { id: group_id }});
                if (userRetreived && group) {
                    await UserToGroup
                    // @ts-ignore
                    .create(validatedData.value, {transaction: t})
                    .then(UserGoup =>
                        res.status(201).send(
                            {
                                message:
                                `User with ID ${user_id} is added to group with ID ${group_id}`,
                            UserGoup,
                            },
                        ));
                    t.commit()
                } else {
                    errorLogger(req, 'User or group not found')
                    res.status(404).send({
                        message: 'User or group not found',
                    });
                    await t.rollback();
                }
            } catch (error) {
                errorLogger(req, error);
                await t.rollback();
                res.status(400).send(error);
            }
        }
    },
};
