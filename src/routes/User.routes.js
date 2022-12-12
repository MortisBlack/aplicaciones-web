import { Router } from "express";
import UserController from "../controllers/User.controller.js"
import passportConfig from './passport.config.js';

const userController = new UserController();
const router = Router();

router.post('', passportConfig, userController.createUser);

router.patch('/:id', passportConfig, userController.updateUser);

router.delete('/:id', passportConfig, userController.deleteUser);

router.get('', passportConfig, userController.getAllUsers);

router.get('/:id', passportConfig, userController.findOneUser);

export default router;