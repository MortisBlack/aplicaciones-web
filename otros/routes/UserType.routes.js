import { Router } from "express";
import { UserTypeController } from "../controllers/UserType.controller.js"
const userTypeController = new UserTypeController();
const router = Router();

router.post('/userType', userTypeController.createUserType);

router.patch('/userType/:id',userTypeController.updateUserType);

router.delete('/userType/:id', userTypeController.deleteUserType);

router.get('/userType', userTypeController.getAllUserTypes);

router.get('/userType/:id', userTypeController.findOneUserType);

export default router;