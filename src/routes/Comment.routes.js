import { Router } from "express";
import CommentController from "../controllers/Comment.controller.js"

const commentController = new CommentController();
const router = Router();

router.post('', commentController.createComment);

router.patch('/:id',commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

router.get('', commentController.getAllComments);

router.get('/:id', commentController.findOneComment);

export default router;