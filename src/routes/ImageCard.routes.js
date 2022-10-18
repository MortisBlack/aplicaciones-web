import { Router } from "express";
import ImageCardController from "../controllers/ImageCard.controller.js"

const imageCardController = new ImageCardController();
const router = Router();

router.post('/imageCard', imageCardController.createImageCard);

router.patch('/imageCard/:id',imageCardController.updateImageCard);

router.delete('/imageCard/:id', imageCardController.deleteImageCard);

router.get('/imageCard', imageCardController.getAllImageCards);

router.get('/imageCard/:id', imageCardController.findOneImageCard);

export default router;