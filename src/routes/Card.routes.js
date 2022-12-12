import { Router } from "express";
import CardController from "../controllers/Card.controller.js"
import passportConfig from './passport.config.js';

const cardController = new CardController();
const router = Router();

router.post('', passportConfig, cardController.createCard);

router.patch('/:id', passportConfig, cardController.updateCard);

router.delete('/:id', passportConfig, cardController.deleteCard);

router.get('', passportConfig, cardController.getAllCards);

router.get('/:id', passportConfig, cardController.findOneCard);

export default router;