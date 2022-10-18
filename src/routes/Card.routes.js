import { Router } from "express";
import CardController from "../controllers/Card.controller.js"

const cardController = new CardController();
const router = Router();

router.post('/card', cardController.createCard);

router.patch('/card/:id',cardController.updateCard);

router.delete('/card/:id', cardController.deleteCard);

router.get('/card', cardController.getAllCards);

router.get('/card/:id', cardController.findOneCard);

export default router;