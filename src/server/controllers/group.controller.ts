import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { usersSearchLimit } from '@/config';
import { schemaGroup } from '@/schema';
import Group from '@/models/group.model';
import { GroupType } from '@/types';
import db from '../models';
import UserToGroup from '@/models/user_to_group.model';
import User from '@/models/user.model';
import { errorLogger, logger } from '@/tools';

export const group =  {
    async create(req: Request, res: Response): Promise<any> {
        const groupData = req.body;
        const validatedData = schemaGroup.validate({...groupData }, { abortEarly: false });
        if (validatedData.error) {
            errorLogger(req, validatedData.error)
            res.status(400).send({...validatedData.error, message: 'Validation error'});
        } else {
            return Group
            .create(validatedData.value)
            .then(user => res.status(201).send({message: 'New group is created', user}))
            .catch(error => {
                errorLogger(req, error)
                res.status(400).send({error: {user: validatedData.value, message: 'Error happened', ...error}})});
        }
    },

    async list(req: Request, res: Response): Promise<any> {
        const {name} = req.query;
        if (! name) {
            return res.status(404).json({message: 'Name is required'});
        }
        return Group
            .findAll({
                raw: true,
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
                subQuery: true,
                limit: parseInt(req.query?.limit?.toString() || '', 1) || usersSearchLimit,
            })
            .then((groupsFound: Group[]) => {
                if (groupsFound.length) {
                    res.status(200).json(groupsFound)
                } else {
                    errorLogger(req, 'Group nor found')
                    const message = `Group with name similar to ${name} not found`;
                    res.status(404).json({message});
                }
            })
            .catch(error => {
                errorLogger(req, error);
                res.status(400).send(error);
            });
    },

    async retrieve(req: Request, res: Response): Promise<any> {
        const { group_id } = req.params;

        return Group
            .findOne({where: { id: group_id }, raw: true})
            .then(groupFound => {
                if (!groupFound) {
                    errorLogger(req, 'Group not found');
                    return res.status(404).send({
                        message: 'Group Not Found',
                    });
                }
                return res.status(200).json(groupFound);
            })
            .catch(error => {
                errorLogger(req, error);
                res.status(400).send(error)
            });
    },

    async update(req: Request, res: Response): Promise<any> {
        const { group_id } = req.params;
        const groupData = req.body;
        return Group
            .findOne({raw: true, where: {id: group_id }})
            // @ts-ignore
            .then((groupFound: GroupType) => {
                if (!groupFound) {
                    errorLogger(req, 'Group not found')
                    return res.status(404).send({
                        message: 'Group Not Found',
                    });
                }
                const validatedData = schemaGroup.validate(groupData
                , { abortEarly: false });
                if (validatedData.error) {
                    errorLogger(req, validatedData.error);
                    return res.status(404).json(validatedData.error);
                } else {
                    const sanitizeToArray = (value) => Array.isArray(value) ? value : [value];
                    const finalValues = validatedData.value.permissions ?
                        {
                            ...validatedData.value,
                            permissions: sanitizeToArray(validatedData.value.permissions),
                        } :
                        validatedData.value;
                    return Group
                    .update(finalValues, {
                        where: {
                          id: group_id,
                        },
                      })
                    .then(() => {
                        res.status(200).json({...groupFound, ...finalValues})})
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
        const { group_id } = req.params;
        const t = await db.sequelize.transaction();
        try {
            const count = await Group
            .destroy({where:
                {id: group_id },
                transaction: t})
            await UserToGroup.destroy({where: {
                groupId: group_id,

            }, transaction: t})
            await t.commit();
            if (!count) {
                await t.rollback();
                errorLogger(req, 'Group not found')
                return res.status(404).send({message: `Group with ID ${group_id} not found`})
            }
            res.status(200).json({message: `Group ${group_id} is deleted`})
        } catch (error) {
            await t.rollback();
            errorLogger(req, error)
            res.status(400).send(error)
        }
    },
    async retrieveUsersInGroup(req: Request, res: Response): Promise<any> {
        const { group_id } = req.params;
        return Group
            .findOne({
                where: { id: group_id },
                include: [User],
            })
            .then(groups => {
                if (!groups ) {
                    errorLogger(req, 'Group Not Found');
                    return res.status(404).send({
                        message: 'Group Not Found',
                    });
                }
                return res.status(200).json(groups);
            })
            .catch(error => {
                errorLogger(req, error);
                res.status(400).send(error)
            });
    },
};
