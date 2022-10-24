import { Router } from "express";
import UserTypeController from "../controllers/UserType.controller.js"

const userTypeController = new UserTypeController();
const router = Router();

router.post('', userTypeController.createUserType);

router.patch('/:id',userTypeController.updateUserType);

router.delete('/:id', userTypeController.deleteUserType);

router.get('', userTypeController.getAllUserTypes);

router.get('/:id', userTypeController.findOneUserType);

export default router;