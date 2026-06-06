import { Router } from 'express';
import * as propertyController from '../controllers/property.controller';

const router = Router();

router.get('/', propertyController.getRooms);
router.post('/', propertyController.createRoom);
router.put('/:id', propertyController.updateRoom);
router.delete('/:id', propertyController.deleteRoom);

export default router;
