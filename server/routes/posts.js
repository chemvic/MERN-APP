import {Router} from 'express';
import  ctrl from '../controllers/index.js';
import authenticate from '../middlewares/authenticate.js';
import { createPost } from '../controllers/posts/posts.js';
const router = new Router();
// create post
router.post('/', authenticate, createPost);


export default router;
