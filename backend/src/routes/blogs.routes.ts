import { Router } from 'express';
import * as blogsController from '../controllers/blogs.controller';

const router = Router();

router.get('/', blogsController.getBlogs);
router.get('/:slug', blogsController.getBlogBySlug);
router.post('/', blogsController.createBlog);
router.delete('/:id', blogsController.deleteBlog);

export default router;
