import * as express from 'express'

import * as controllers from '@/controllers';
import { loggerTime } from '@/tools';
const router = express.Router();
const userController = controllers.user;
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), req, res)
    next()
  })
router.get('/:user_id',  loggerTime(userController.retrieve));
router.get('/', loggerTime(userController.list));
router.delete('/:user_id',  loggerTime(userController.destroy));
router.put('/:user_id', loggerTime(userController.update));
router.post('/', loggerTime(userController.create));
router.post('/:user_id/:group_id', loggerTime(userController.addUserToGroup));
export default router
