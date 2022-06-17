import express from 'express'

import controllers from "../../server/controllers/index.js";

const router = express.Router();
const userController = controllers.users;

router.get('/user/:user_id',  userController.retrieve);
router.get('/user',  userController.list);

router.delete('/user/:user_id',  userController.destroy);

router.put('/user/:user_id', userController.update);

router.post('/user', userController.create);
export default router