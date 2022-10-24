import { Router } from "express";
import ImageCardController from "../controllers/ImageCard.controller.js"

const imageCardController = new ImageCardController();
const router = Router();

router.post('', imageCardController.createImageCard);

router.patch('/:id',imageCardController.updateImageCard);

router.delete('/:id', imageCardController.deleteImageCard);

router.get('', imageCardController.getAllImagesCards);

router.get('/:id', imageCardController.findOneImageCard);

export default router;