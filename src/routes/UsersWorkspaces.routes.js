import { Router } from "express";
import { UsersWorkspacesController } from "../controllers/UsersWorkspaces.controller.js"
const usersWorkspacesController = new UsersWorkspacesController();
const router = Router();

router.post('/usersWorkspaces', usersWorkspacesController.createUsersWorkspaces);

router.patch('/usersWorkspaces/:id',usersWorkspacesController.updateUsersWorkspaces);

router.delete('/usersWorkspaces/:id', usersWorkspacesController.deleteUsersWorkspaces);

router.get('/usersWorkspaces', usersWorkspacesController.getAllUsersWorkspaces);

router.get('/usersWorkspaces/:id', usersWorkspacesController.findOneUsersWorkspaces);

export default router;