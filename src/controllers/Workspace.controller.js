import WorkspaceBo from "../domain/Workspace.js";


import WorkspaceRepository from "../data/repositories/Workspace.repository.js";

const workspaceRepository = new WorkspaceRepository();

export default class WorkspaceController{

    async createWorkspace(req, res, next){
        const {title, description} = req.body;

        const workspace = new WorkspaceBo(undefined,title, description);
        let result = await workspaceRepository.create(workspace);

        res.status(201).send({
            message: "Workspace created successfully", 
            result: result
        });     
    }

    async updateWorkspace(req, res, next){
            const {title, description} = req.body;
            const {id} = req.params;
    
            const workspace = new WorkspaceBo(id, title, description);
            let result = await workspaceRepository.update(workspace);
    
            res.status(200).send({
                message: "Workspace updated successfully", 
                result: result
            });
        }

    async deleteWorkspace(req, res, next){
        const {id} = req.params;

        let result = await workspaceRepository.delete(id);

        res.status(200).send({
            message: result
        });
    }

    async getAllWorkspaces(req, res, next){
        let result = await workspaceRepository.findAll();

        res.status(200).send({
            message: "Workspaces fetched successfully", 
            result: result
        });
    }

    async findOneWorkspace(req, res, next){
        const {id} = req.params;

        let result = await workspaceRepository.findOne(id);

        res.status(200).send({
            message: "Workspace fetched successfully", 
            result: result
        });
    }
}