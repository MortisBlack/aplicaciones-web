import { Router } from "express";
import { TagsCardsController } from "../controllers/TagsCards.controller.js"
const tagsCardsController = new TagsCardsController();
const router = Router();

router.post('/tagsCards', tagsCardsController.createTagsCards);

router.patch('/tagsCards/:id',tagsCardsController.updateTagsCards);

router.delete('/tagsCards/:id', tagsCardsController.deleteTagsCards);

router.get('/tagsCards', tagsCardsController.getAllTagsCards);

router.get('/tagsCards/:id', tagsCardsController.findOneTagsCards);

export default router;