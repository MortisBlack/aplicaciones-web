import { Router } from "express";
import TagController from "../controllers/Tag.controller.js"

const tagController = new TagController();
const router = Router();

router.post('/tag', tagController.createTag);

router.patch('/tag/:id',tagController.updateTag);

router.delete('/tag/:id', tagController.deleteTag);

router.get('/tag', tagController.getAllTags);

router.get('/tag/:id', tagController.findOneTag);

export default router;