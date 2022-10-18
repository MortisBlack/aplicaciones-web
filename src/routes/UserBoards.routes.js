import { Router } from "express";
import UserBoardsController from "../controllers/UserBoards.controller.js"

const userBoardsController = new UserBoardsController();
const router = Router();

router.post('/userBoards', userBoardsController.createUserBoards);

router.patch('/userBoards/:id',userBoardsController.updateUserBoards);

router.delete('/userBoards/:id', userBoardsController.deleteUserBoards);

router.get('/userBoards', userBoardsController.getAllUserBoards);

router.get('/userBoards/:id', userBoardsController.findOneUserBoards);

export default router;