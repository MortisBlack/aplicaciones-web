import { Router } from "express";
import { UsersCardsController } from "../controllers/UsersCards.controller.js"
const usersCardsController = new UsersCardsController();
const router = Router();

router.post('/usersCards', usersCardsController.createUsersCards);

router.patch('/usersCards/:id',usersCardsController.updateUsersCards);

router.delete('/usersCards/:id', usersCardsController.deleteUsersCards);

router.get('/usersCards', usersCardsController.getAllUsersCards);

router.get('/usersCards/:id', usersCardsController.findOneUsersCards);

export default router;