import WorkspaceRepository from "../data/repositories/Workspace.repository.js";
import UserWorkspacesRepository from "../data/repositories/UserWorkspaces.repository.js";
import WorkspaceBo from "../domain/Workspace.js";
import UserWorkspaceBo from "../domain/UsersWorkspaces.js";

const workspaceRepository = new WorkspaceRepository();
const userWorkspacesRepository = new UserWorkspacesRepository();

export default class WorkspaceController{

    async createWorkspace(req, res, next){
        try {
            const user = req.user;
            const {title, description} = req.body;

            const workspace = new WorkspaceBo(
                undefined,
                title, 
                description
            );
            

            let result = await workspaceRepository.create(workspace);

            const userWorkspace = new UserWorkspaceBo(
                undefined,
                user,
                undefined,
                result
            );

            userWorkspacesRepository.create(userWorkspace);

            res.status(200).send({
                message: "Workspace created successfully", 
                result: result
            });
        } catch (err) {
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
            }
        } catch (err) {
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
            }
        } catch (err) {
            next(err)
        }
    }

    async getAllWorkspaces(req, res, next){
        try {
            const user = req.user;
            let result = await workspaceRepository.findAllByUserId(user.id);

            if(result) {
                res.status(200).send({
                    message: "Workspaces fetched successfully", 
                    result: result
                });
            }
        } catch (error) {
            next(error)
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
            }
        } catch (err) {
            next(err)
        }
    }

    async findAllBoards(req, res, next){

        try {
            const {id} = req.params;

            let result = await workspaceRepository.findAllBoards(id);
           
            if(result) {
                res.status(200).send({
                    message: "Boards fetched successfully",
                    result: result
                });
            }
        } catch (err) {
            next(err)
        }
    }
}