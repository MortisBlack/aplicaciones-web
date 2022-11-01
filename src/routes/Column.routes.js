import { Router } from "express";
import ColumnController from "../controllers/Column.controller.js"

const columnController = new ColumnController();
const router = Router();

router.post('', columnController.createColumn);

router.patch('/:id',columnController.updateColumn);

router.delete('/:id', columnController.deleteColumn);

router.get('', columnController.getAllColumns);

router.get('/:id', columnController.findOneColumn);

router.get('/:id/cards', columnController.findAllCards);

export default router;