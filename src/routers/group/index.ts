import * as express from 'express'
import * as controllers from '@/controllers';
import { loggerTime } from '@/tools';
const router = express.Router();
const groupController = controllers.group;
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), req, res)
    next()
  })
router.get('/:group_id',  loggerTime(groupController.retrieve));
router.get('/', loggerTime(groupController.list));
router.delete('/:group_id',  loggerTime(groupController.destroy));
router.put('/:group_id', loggerTime(groupController.update));
router.post('/', loggerTime(groupController.create));
router.get('/:group_id/users', loggerTime(groupController.retrieveUsersInGroup))
export default router
