import { Router } from "express";
import UsersWorkspacesController from "../controllers/UsersWorkspaces.controller.js"
import passportConfig from './passport.config.js';

const usersWorkspacesController = new UsersWorkspacesController();
const router = Router();

router.post('/usersWorkspaces', passportConfig, usersWorkspacesController.createUsersWorkspaces);

router.patch('/usersWorkspaces/:id', passportConfig, usersWorkspacesController.updateUsersWorkspaces);

router.delete('/usersWorkspaces/:id', passportConfig, usersWorkspacesController.deleteUsersWorkspaces);

router.get('/usersWorkspaces', passportConfig, usersWorkspacesController.getAllUsersWorkspaces);

router.get('/usersWorkspaces/:id', passportConfig, usersWorkspacesController.findOneUsersWorkspaces);

export default router;