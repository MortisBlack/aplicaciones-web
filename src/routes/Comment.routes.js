import { Router } from "express";
import CommentController from "../controllers/Comment.controller.js"

const commentController = new CommentController();
const router = Router();

router.post('/comment', commentController.createComment);

router.patch('/comment/:id',commentController.updateComment);

router.delete('/comment/:id', commentController.deleteComment);

router.get('/comment', commentController.getAllComments);

router.get('/comment/:id', commentController.findOneComment);

export default router;