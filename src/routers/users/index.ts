import express, { Request, Response, NextFunction } from 'express'
import { User } from "@/types";
import { schemaUser } from "@/schema";

import controllers from "../../server/controllers";

const router = express.Router();
const userController = controllers.users;

router.get('/user/:user_id',  userController.retrieve);
router.get('/user',  userController.list);

router.delete('/user/:user_id',  userController.destroy);

router.put('/user/:user_id', userController.update);

router.post('/user', userController.create);
export default router