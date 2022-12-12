import { Router } from "express";
import UserBoardsController from "../controllers/UserBoards.controller.js"
import passportConfig from './passport.config.js';

const userBoardsController = new UserBoardsController();
const router = Router();

router.post('/userBoards', passportConfig, userBoardsController.createUserBoards);

router.patch('/userBoards/:id', passportConfig, userBoardsController.updateUserBoards);

router.delete('/userBoards/:id', passportConfig, userBoardsController.deleteUserBoards);

router.get('/userBoards', passportConfig, userBoardsController.getAllUserBoards);

router.get('/userBoards/:id', passportConfig, userBoardsController.findOneUserBoards);

export default router;