import { Router } from "express";
import TagController from "../controllers/Tag.controller.js"
import passportConfig from './passport.config.js';

const tagController = new TagController();
const router = Router();

router.post('/tag', passportConfig, tagController.createTag);

router.patch('/tag/:id', passportConfig, tagController.updateTag);

router.delete('/tag/:id', passportConfig, tagController.deleteTag);

router.get('/tag', passportConfig, tagController.getAllTags);

router.get('/tag/:id', passportConfig, tagController.findOneTag);

export default router;