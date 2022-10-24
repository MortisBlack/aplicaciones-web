import WorkspaceRepository from "../data/repositories/Workspace.repository.js";
import WorkspaceBo from "../domain/Workspace.js";

const workspaceRepository = new WorkspaceRepository();

export default class WorkspaceController{

    async createWorkspace(req, res, next){
        try {
            const {title, description} = req.body;

            const workspace = new WorkspaceBo(
                undefined,
                title, 
                description);

            let result = await workspaceRepository.create(workspace);

            res.status(200).send({
                message: "Workspace created successfully", 
                result: result
            });
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async updateWorkspace(req, res, next){
        try {
            const {title, description} = req.body;
            const {id} = req.params;
    
            const workspace = new WorkspaceBo(id, title, description);
            let result = await workspaceRepository.update(workspace);
            
            if(result) {
                res.status(200).send({
                    message: "Workspace updated successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The workspace ${id} doesn't exist`
                });
            }

        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async deleteWorkspace(req, res, next){
        try {
            const {id} = req.params;

            let result = await workspaceRepository.delete(id);

            if(result) {
                res.status(200).send({
                    message: "Workspace deleted successfully"
                });
            } else {
                res.status(404).send({
                    message: `The workspace ${id} doesn't exist`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async getAllWorkspaces(req, res, next){
        try {
            let result = await workspaceRepository.findAll();

            if(result) {
                res.status(200).send({
                    message: "Workspaces fetched successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `There are not workspaces registered yet`
                });
            }

        } catch (error) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async findOneWorkspace(req, res, next){
        try {
            const {id} = req.params;

            let result = await workspaceRepository.findOne(id);

            if(result) {
                res.status(200).send({
                    message: "Workspace fetched successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The workspace ${id} doesn't exist`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }
}