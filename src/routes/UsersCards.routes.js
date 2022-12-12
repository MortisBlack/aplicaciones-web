import { Router } from "express";
import UsersCardsController from "../controllers/UsersCards.controller.js"
import passportConfig from './passport.config.js';

const usersCardsController = new UsersCardsController();
const router = Router();

router.post('/usersCards', passportConfig, usersCardsController.createUsersCards);

router.patch('/usersCards/:id', passportConfig, usersCardsController.updateUsersCards);

router.delete('/usersCards/:id', passportConfig, usersCardsController.deleteUsersCards);

router.get('/usersCards', passportConfig, usersCardsController.getAllUsersCards);

router.get('/usersCards/:id', passportConfig, usersCardsController.findOneUsersCards);

export default router;