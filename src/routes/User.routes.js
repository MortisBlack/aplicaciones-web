import { Router } from "express";
import UserController from "../controllers/User.controller.js"

const userController = new UserController();
const router = Router();

router.get('/user', userController.createUser);
router.get('/pato', userController.noCreate);

// router.patch('/user/:id',userController.updateUser);

// router.delete('/user/:id', userController.deleteUser);

// router.get('/user', userController.getAllUsers);

// router.get('/user/:id', userController.findOneUser);

export default router;