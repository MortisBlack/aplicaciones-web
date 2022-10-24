import { Router } from "express";
import BoardController from "../controllers/Board.controller.js"

const boardController = new BoardController();
const router = Router();

router.post('', boardController.createBoard);

router.patch('/:id',boardController.updateBoard);

router.delete('/:id', boardController.deleteBoard);

router.get('', boardController.getAllBoards);

router.get('/:id', boardController.findOneBoard);

export default router;