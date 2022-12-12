import { Router } from "express";
import BoardController from "../controllers/Board.controller.js"
import passportConfig from './passport.config.js';

const boardController = new BoardController();
const router = Router();

router.post('', passportConfig, boardController.createBoard);

router.put('/:id', passportConfig, boardController.updateBoard);

router.patch('/:id', passportConfig, boardController.updateBoardTitle);

router.delete('/:id', passportConfig, boardController.deleteBoard);

router.get('', passportConfig, boardController.getAllBoards);

router.get('/:id', passportConfig, boardController.findOneBoard);

router.get('/:id/columns', passportConfig, boardController.findAllColumns);

export default router;