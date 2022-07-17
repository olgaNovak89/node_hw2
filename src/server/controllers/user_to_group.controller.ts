import { Request, Response } from 'express';
import { schemaUserToGroup } from '@/schema';
import UserToGroup from '@/models/user_to_group.model';
import db from '../models';

export const users_to_group =  {
    async add(req: Request, res: Response): Promise<any> {
        const { group_id , user_id } = req.params;
        const validatedData = schemaUserToGroup.validate(
            {groupId: group_id, userId: user_id}, { abortEarly: false },
        );
        if (validatedData.error) {
            res.status(400).send({...validatedData.error, message: 'Validation error'});
        } else {
            return UserToGroup
            // @ts-ignore
            .create(validatedData.value)
            .then(UserGoup =>
                res.status(201).send(
                    {
                        message:
                        `User with ID ${user_id} is added to group with ID ${group_id}`,
                     UserGoup,
                    },
                     ))
            .catch(error => res.status(400).send({error: {user: validatedData.value, message: 'Error happened', ...error}}));
        }
    },

    retrieve(req: Request, res: Response): Promise<any> {
        const { group_id } = req.params;
        
        return UserToGroup
            .findAll({
                where: { gropId: group_id },
                group: 'groupId',
                include: [UserToGroup.associations.user_id],
            })
            .then(groups => {
                if (!groups || !groups.length) {
                    return res.status(404).send({
                        message: 'Group Not Found',
                    });
                }
                return res.status(200).json(groups[0]);
            })
            .catch(error => res.status(400).send(error));
    },


    async destroy(req: Request, res: Response): Promise<any> {
        const { user_id, group_id } = req.params;
        const t = await db.sequelize.transaction();
        try {
        const count = await UserToGroup
        .destroy({
            where: {
                userId: user_id,
                gropId: group_id,
            },
            transaction: t,
        });
        UserToGroup.destroy({where: {
            id: user_id,
            transaction: t,
        }})
        await t.commit();
        if (!count) {
                res.status(404).send({
                    message: `User with ID ${user_id} is not found in group with ID ${group_id}`,
                })
            }
        res.status(200).json({
                message: `User with ID ${user_id} is deleted from the group with ID ${group_id}`,
            })
        } catch (error) {
          await t.rollback();
          res.status(400).send({message: error})
        }
    },
};
