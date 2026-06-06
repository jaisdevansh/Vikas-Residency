import { Router } from 'express';
import * as propertyController from '../controllers/property.controller';

const router = Router();

router.get('/', propertyController.getProperty);
router.get('/setup', propertyController.setup);

export default router;
