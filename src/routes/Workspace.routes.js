import { Router } from "express";
import WorkspaceController from "../controllers/Workspace.controller.js"
const workspaceController = new WorkspaceController();
import passportConfig from './passport.config.js';

const router = Router();

router.post('', passportConfig, workspaceController.createWorkspace);

router.put('/:id',passportConfig, workspaceController.updateWorkspace);

router.patch('/:id',passportConfig, workspaceController.updateWorkspaceTitle);

router.delete('/:id',passportConfig,  workspaceController.deleteWorkspace);

router.get('',passportConfig,  workspaceController.getAllWorkspaces);

router.get('/:id',passportConfig,  workspaceController.findOneWorkspace);

router.get('/:id/boards', workspaceController.findAllBoards);

export default router;