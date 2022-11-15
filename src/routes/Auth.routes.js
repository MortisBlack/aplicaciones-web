import { Router } from "express";
import AuthController from "../controllers/Auth.controller.js";

const authController = new AuthController();
const router = Router();

//router.post('/register', boardController.register);

router.post('/login', authController.login);

export default router;