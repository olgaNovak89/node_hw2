import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { usersSearchLimit } from '@/config';
import { schemaGroup } from '@/schema';
import Group from '@/models/Group.model';
import { GroupType } from '@/types';

export const group =  {
    async create(req: Request, res: Response): Promise<any> {
        const groupData = req.body;
        console.log(groupData)
        const validatedData = schemaGroup.validate({...groupData }, { abortEarly: false });
        if (validatedData.error) {
            res.status(400).send({...validatedData.error, message: 'Validation error'});
        } else {
            return Group
            .create(validatedData.value)
            .then(user => res.status(201).send({message: 'New group is created', user}))
            .catch(error => res.status(400).send({error: {user: validatedData.value, message: 'Error happened', ...error}}));
        }
    },

    async list(req: Request, res: Response): Promise<any> {
        const {name} = req.query;
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
                    const message = `Group with name similar to ${name} not found`;
                    res.status(404).json({message});
                }
            })
            .catch(error => res.status(400).send(error));
    },

    retrieve(req: Request, res: Response): Promise<any> {
        const { group_id } = req.params;

        return Group
            .findOne({where: { id: group_id }})
            .then(group => {
                // @ts-ignore
                if (!group) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).json(group);
            })
            .catch(error => res.status(400).send(error));
    },

    async update(req: Request, res: Response): Promise<any> {
        const { group_id } = req.params;
        return Group
            .findOne({raw: true,where: {id: group_id }})
            .then((groupFound: GroupType) => {
                if (!groupFound) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                const groupData = req.body;
                const validatedData = schemaGroup.validate(groupData
                , { abortEarly: false });
                if (validatedData.error) {
                    return res.status(404).json(validatedData.error);
                } else {
                    console.log(groupData, groupFound, validatedData)
                return Group
                    .update(validatedData.value, {
                        where: {
                          id: group_id,
                        },
                      })
                    .then(() => res.status(200).json({...groupFound, ...validatedData.value}))
                    .catch((error) => res.status(400).send(error));
                }
            })
            .catch((error) => res.status(400).send(error));
    },

    async destroy(req: Request, res: Response): Promise<any> {
        const { group_id } = req.params;
        return Group
        .destroy({where: {id: group_id}})
        .then((code: number) =>{console.log(code); res.status(200).json({message: `Group ${group_id} is deleted`})})
        .catch((error) => res.status(400).send(error));

    },
};
