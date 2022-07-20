import * as express from 'express'
import * as controllers from '@/controllers';
import { logger } from '@/tools';
const router = express.Router();
const groupController = controllers.group;
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), req, res)
    next()
  })
router.get('/:group_id',  logger(groupController.retrieve));
router.get('/', logger(groupController.list));
router.delete('/:group_id',  logger(groupController.destroy));
router.put('/:group_id', logger(groupController.update));
router.post('/', logger(groupController.create));
router.get('/:group_id/users', logger(groupController.retrieveUsersInGroup))
export default router
