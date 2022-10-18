import { Router } from "express";
import WorkspaceController from "../controllers/Workspace.controller.js"
const workspaceController = new WorkspaceController();
const router = Router();

router.post('', workspaceController.createWorkspace);

router.patch('/:id',workspaceController.updateWorkspace);

router.delete('/:id', workspaceController.deleteWorkspace);

router.get('', workspaceController.getAllWorkspaces);

router.get('/:id', workspaceController.findOneWorkspace);

export default router;