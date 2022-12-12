import { Router } from "express";
import TagsCardsController from "../controllers/TagsCards.controller.js"
import passportConfig from './passport.config.js';

const tagsCardsController = new TagsCardsController();
const router = Router();

router.post('/tagsCards', passportConfig, tagsCardsController.createTagsCards);

router.patch('/tagsCards/:id', passportConfig, tagsCardsController.updateTagsCards);

router.delete('/tagsCards/:id', passportConfig, tagsCardsController.deleteTagsCards);

router.get('/tagsCards', passportConfig, tagsCardsController.getAllTagsCards);

router.get('/tagsCards/:id', passportConfig, tagsCardsController.findOneTagsCards);

export default router;