import { Router } from 'express';
import * as galleryController from '../controllers/gallery.controller';

const router = Router();

router.get('/', galleryController.getGalleryImages);
router.post('/', galleryController.createGalleryImage);
router.delete('/:id', galleryController.deleteGalleryImage);

export default router;
