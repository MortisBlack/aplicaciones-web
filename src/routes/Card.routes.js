import { Router } from "express";
import CardController from "../controllers/Card.controller.js"

const cardController = new CardController();
const router = Router();

router.post('', cardController.createCard);

router.patch('/:id',cardController.updateCard);

router.delete('/:id', cardController.deleteCard);

router.get('', cardController.getAllCards);

router.get('/:id', cardController.findOneCard);

export default router;