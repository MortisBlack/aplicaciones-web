import { Router } from "express";
import BoardController from "../controllers/Board.controller.js"
import passportConfig from './passport.config.js';

const boardController = new BoardController();
const router = Router();

router.post('', boardController.createBoard);

router.put('/:id',boardController.updateBoard);

router.patch('/:id',boardController.updateBoardTitle);

router.delete('/:id', boardController.deleteBoard);

router.get('', passportConfig, boardController.getAllBoards);

router.get('/:id', boardController.findOneBoard);

router.get('/:id/columns', boardController.findAllColumns);

export default router;