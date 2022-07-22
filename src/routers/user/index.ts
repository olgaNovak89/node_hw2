import * as express from 'express'

import * as controllers from '@/controllers';
import { logger } from '@/tools';
const router = express.Router();
const userController = controllers.user;
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), req, res)
    next()
  })
router.get('/:user_id',  userController.retrieve);
router.get('/', userController.list);
router.delete('/:user_id',  userController.destroy);
router.put('/:user_id', userController.update);
router.post('/', userController.create);
router.post('/:user_id/:group_id', userController.addUserToGroup)
export default router
