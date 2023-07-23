import {Router} from 'express';
import  ctrl from '../controllers/index.js';
import authenticate from '../middlewares/authenticate.js';
const router = new Router();

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/me', authenticate, ctrl.getMe);

export default router;
