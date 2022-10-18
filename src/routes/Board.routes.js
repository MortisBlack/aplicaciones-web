import { Router } from "express";
import BoardController from "../controllers/Board.controller.js"

const boardController = new BoardController();
const router = Router();

router.post('/board', boardController.createBoard);

router.patch('/board/:id',boardController.updateBoard);

router.delete('/board/:id', boardController.deleteBoard);

router.get('/board', boardController.getAllBoards);

router.get('/board/:id', boardController.findOneBoard);

export default router;