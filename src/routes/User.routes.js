import { Router } from "express";
import UserController from "../controllers/User.controller.js"
const userController = new UserController();
const router = Router();

router.post('', userController.createUser);

router.patch('/:id',userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.get('', userController.getAllUsers);

router.get('/:id', userController.findOneUser);

export default router;