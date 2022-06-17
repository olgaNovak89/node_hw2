import Joi from 'joi';
import { User } from './types';

export const schemaUser = Joi.object<User>({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number()
    .integer()
    .min(4)
    .max(130).required(),
    isDeleted: Joi.boolean()
})
;