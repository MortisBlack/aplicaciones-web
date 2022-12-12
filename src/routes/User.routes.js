import { Router } from "express";
import UserController from "../controllers/User.controller.js"
import passportConfig from './passport.config.js';
import multer from 'multer';

var upload = multer({ dest: 'upload/'});
var type = upload.single('img_profile');

const userController = new UserController();
const router = Router();

router.post('', type, userController.createUser);

router.patch('/:id', passportConfig, userController.updateUser);

router.delete('/:id', passportConfig, userController.deleteUser);

router.get('', passportConfig, userController.getAllUsers);

router.get('/:id', passportConfig, userController.findOneUser);

export default router;