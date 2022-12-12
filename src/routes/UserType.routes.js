import { Router } from "express";
import UserTypeController from "../controllers/UserType.controller.js"
import passportConfig from './passport.config.js';

const userTypeController = new UserTypeController();
const router = Router();

router.post('', passportConfig, userTypeController.createUserType);

router.patch('/:id', passportConfig, userTypeController.updateUserType);

router.delete('/:id', passportConfig, userTypeController.deleteUserType);

router.get('', passportConfig, userTypeController.getAllUserTypes);

router.get('/:id', passportConfig, userTypeController.findOneUserType);

export default router;