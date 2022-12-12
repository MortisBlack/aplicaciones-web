import { Router } from "express";
import ImageCardController from "../controllers/ImageCard.controller.js"
import passportConfig from './passport.config.js';

const imageCardController = new ImageCardController();
const router = Router();

router.post('', passportConfig, imageCardController.createImageCard);

router.patch('/:id', passportConfig, imageCardController.updateImageCard);

router.delete('/:id', passportConfig, imageCardController.deleteImageCard);

router.get('', passportConfig, imageCardController.getAllImagesCards);

router.get('/:id', passportConfig, imageCardController.findOneImageCard);

export default router;