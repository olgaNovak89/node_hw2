import * as Joi from 'joi';
import { User } from '@/types';
import Group from '@/models/Group.model';
import { IsArray } from 'sequelize-typescript';

export const schemaUser = Joi.object<User>({
    // id: Joi.string().required(),
    login: Joi.string().required().optional().allow(null),
    password: Joi.string().alphanum().required().optional().allow(null),
    age: Joi.number()
    .integer()
    .min(4)
    .max(130).required().optional().allow(null),
    isDeleted: Joi.boolean().optional().allow(null),
});11
export const schemaGroup = Joi.object<Group>({
    name: Joi.string().required().optional().allow(null),
    permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')).optional().allow(null)
})
