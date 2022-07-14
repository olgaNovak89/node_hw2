import * as Joi from 'joi';
import { User } from '@/types';
import Group from '@/models/Group.model';

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
export const schemaUGroup = Joi.object<Group>({
    name: Joi.string().required().optional().allow(null),
    permissions: Joi.custom((value) => value.every(permission => ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'].includes(permission)))
})