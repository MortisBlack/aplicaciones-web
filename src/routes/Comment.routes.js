import { Router } from "express";
import CommentController from "../controllers/Comment.controller.js"
import passportConfig from './passport.config.js';

const commentController = new CommentController();
const router = Router();

router.post('', passportConfig, commentController.createComment);

router.patch('/:id', passportConfig, commentController.updateComment);

router.delete('/:id', passportConfig, commentController.deleteComment);

router.get('', passportConfig, commentController.getAllComments);

router.get('/:id', passportConfig, commentController.findOneComment);

export default router;