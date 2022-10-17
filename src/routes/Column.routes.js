import { Router } from "express";
import { ColumnController } from "../controllers/Column.controller.js"
const columnController = new ColumnController();
const router = Router();

router.post('/column', columnController.createColumn);

router.patch('/column/:id',columnController.updateColumn);

router.delete('/column/:id', columnController.deleteColumn);

router.get('/column', columnController.getAllColumns);

router.get('/column/:id', columnController.findOneColumn);

export default router;