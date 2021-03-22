// tslint:disable-next-line: import-name
import Router from 'express';

import * as controller from '../controllers/index';

const router = Router();

// usuarios
router.get('/users', controller.getUsers);
router.post('/users', controller.createUser);
router.get('/users/:id', controller.getUserById);
router.put('/users/:id', controller.putUser);
router.delete('/users/:id', controller.deleteUser);

export default router;
