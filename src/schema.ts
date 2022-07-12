import * as Joi from 'joi';
import { User } from '@/types';

export const schemaUser = Joi.object<User>({
    // id: Joi.string().required(),
    login: Joi.string().required().allow(null),
    password: Joi.string().alphanum().required().allow(null),
    age: Joi.number()
    .integer()
    .min(4)
    .max(130).required().allow(null),
    isDeleted: Joi.boolean().allow(null),
})
;
