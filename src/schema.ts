import * as Joi from 'joi';
import { User } from '@/types';
import Group from '@/models/group.model';
import { IsArray } from 'sequelize-typescript';
import UserToGroup from '@/models/user_to_group.model';

export const schemaUser = Joi.object<User>({
    // id: Joi.string().required(),
    login: Joi.string().required().optional().allow(null),
    password: Joi.string().alphanum().required().optional().allow(null),
    age: Joi.number()
    .integer()
    .min(4)
    .max(130).required().optional().allow(null),
    isDeleted: Joi.boolean().optional().allow(null),
});
const permissionSchema = Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');
export const schemaGroup = Joi.object<Group>({
    name: Joi.string().required().optional().allow(null),
    permissions: Joi.alternatives().try(Joi.array().items(permissionSchema), permissionSchema).optional().allow(null),
})
export const schemaUserToGroup = Joi.object<UserToGroup>({
    userId: Joi.string().required(),
    groupId: Joi.string().required(),
})
