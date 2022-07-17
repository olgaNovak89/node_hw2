import * as express from 'express'
import * as controllers from '@/controllers';
const router = express.Router();
const userToGroupController = controllers.users_to_group;
router.use((req, res, next) => {
    console.log('Time: ', Date.now(), req, res)
    next()
  })
router.get('/:group_id',  userToGroupController.retrieve);
router.delete('/:group_id', userToGroupController.destroy)
router.post('/:group_id/:user_id', userToGroupController.add);
export default router
