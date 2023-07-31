import {Router} from 'express';
import  ctrl from '../controllers/index.js';
import authenticate from '../middlewares/authenticate.js';
import { createPost, getAll, getById } from '../controllers/posts/posts.js';
const router = new Router();
// create post
router.post('/', authenticate, createPost);

// get posts
router.get('/', getAll);

// get posts by id

router.get('/:id', getById);


export default router;
