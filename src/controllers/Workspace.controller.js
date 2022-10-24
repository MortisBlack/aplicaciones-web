import WorkspaceRepository from "../data/repositories/Workspace.repository.js";
import WorkspaceBo from "../domain/Workspace.js";

const workspaceRepository = new WorkspaceRepository();

export default class WorkspaceController{

    async createWorkspace(req, res, next){
        try {
            const {title, description} = req.body;

            const workspace = new WorkspaceBo(undefined,title, description);
            let result = await workspaceRepository.create(workspace);

            res.status(201).send({
                message: "Workspace created successfully", 
                result: result
            });
        } catch (err) {
            err.message = 'Error creating workspace'
            next(err)
        }
    }

    async updateWorkspace(req, res, next){
        try {
            const {title, description} = req.body;
            const {id} = req.params;
    
            const workspace = new WorkspaceBo(id, title, description);
            let result = await workspaceRepository.update(workspace);
    
            res.status(200).send({
                message: "Workspace updated successfully", 
                result: result
            });
        } catch (err) {
            err.message = 'Error updating workspace'
            next(err)
        }
    }

    async deleteWorkspace(req, res, next){
        try {
            const {id} = req.params;

            let result = await workspaceRepository.delete(id);

            res.status(200).send({
                message: "Workspace deleted successfully", 
                result: result
            });
        } catch (err) {
            err.message = 'Error deleting workspace'
            next(err)
        }
    }

    async getAllWorkspaces(req, res, next){
        try {
            let result = await workspaceRepository.findAll();

            res.status(200).send({
                message: "Workspaces fetched successfully", 
                result: result
            });
        } catch (error) {
            err.message = 'Error getting all workspaces'
            next(err)
        }
    }

    async findOneWorkspace(req, res, next){
        try {
            const {id} = req.params;

            let result = await workspaceRepository.findOne(id);

            res.status(200).send({
                message: "Workspace fetched successfully", 
                result: result
            });
        } catch (err) {
            err.message = 'Error getting workspace'
            next(err)
        }
    }
}