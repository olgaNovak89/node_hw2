import * as express from 'express'
import * as controllers from '@/controllers';
const router = express.Router();
const groupController = controllers.group;
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), req, res)
    next()
  })
router.get('/:group_id',  groupController.retrieve);
router.get('/', groupController.list);
router.delete('/:group_id',  groupController.destroy);
router.put('/:group_id', groupController.update);
router.post('/', groupController.create);
export default router
