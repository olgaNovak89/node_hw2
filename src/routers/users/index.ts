import * as express from 'express'

import * as controllers from '@/controllers';

const router = express.Router();
const userController = controllers.users;


router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })
router.get('/:user_id',  userController.retrieve);
router.get('/', userController.list);
router.delete('/:user_id',  userController.destroy);
router.put('/:user_id', userController.update);
router.post('/', userController.create);
export default router
