import { Router } from "express";
import ColumnController from "../controllers/Column.controller.js"
import passportConfig from './passport.config.js';

const columnController = new ColumnController();
const router = Router();

router.post('', passportConfig, columnController.createColumn);

router.patch('/:id', passportConfig, columnController.updateColumn);

router.delete('/:id', passportConfig, columnController.deleteColumn);

router.get('', passportConfig, columnController.getAllColumns);

router.get('/:id', passportConfig, columnController.findOneColumn);

router.get('/:id/cards', passportConfig, columnController.findAllCards);

export default router;