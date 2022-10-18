import { Router } from "express";
import WorkspaceController from "../controllers/Worckspace.Controller.js"
const workspaceController = new WorkspaceController();
const router = Router();

router.post('/workspace', workspaceController.createWorkspace);

router.patch('/workspace/:id',workspaceController.updateWorkspace);

router.delete('/workspace/:id', workspaceController.deleteWorkspace);

router.get('/workspace', workspaceController.getAllWorkspaces);

router.get('/workspace/:id', workspaceController.findOneWorkspace);

export default router;