import Workspace from '../../models/Workspace.js';
import User from '../../models/User.js';
import WorkspaceBO from '../../domain/Workspace.js';
import Board from '../../models/Board.js';
import BoardBO from '../../domain/Board.js';
import UserWorkspaces from '../../domain/UsersWorkspaces.js';

export default class WorkspaceRepository {


    async create(workspace) {
        const workspaceBO = workspace.toPersistenceObject()
        const result = await Workspace.create(workspaceBO);
        return new WorkspaceBO(
            result.id, 
            result.title, 
            result.description
            );
    }

    async update(workspace) {

        if(workspace.id === undefined){
            const error = new Error('id is undefined');
            error.status = 404;
            throw error;
        }

        await this.findOne(workspace.id);

        const workspaceBO = workspace.toPersistenceObject()
        const result = await Workspace.update(workspaceBO, {
            where: {
                id: workspace.id
            }
        });
        return this.findOne(workspace.id);
    }

    async delete(id, userId) {
        await this.findOne(id);

        // TODO: Fix this query, the where clause is not working
        const result = await Workspace.destroy({
            include: [
                {
                    model: UserWorkspaces,
                    required:true,
                    where: {
                        UserId: id,
                        owner: true
                    }
                }
            ],
            where: {
                id: id
            },
        });
        console.log("Result:",result);

        return "Workspace successfully deleted";
    }

    async findOne(id) {
        
        const result = await Workspace.findOne({
            where: {
                id: id,
                
            }
        });

        if(result == null) {
            const error = new Error(`The workspace ${id} doesn't exist`);
            error.status = 404;
            throw error;
        };

        return new WorkspaceBO(result.dataValues.id, result.dataValues.title, result.dataValues.description);
    }

    async findAll() {        
        const result = await Workspace.findAll();

        if(result == null || result.length == 0) {
            const error = new Error(`There are not workspaces registered yet`);
            error.status = 404;
            throw error;
        };

        return result.map((element, index)=> {
            return new WorkspaceBO(element.dataValues.id, element.dataValues.title, element.dataValues.description)
        });
    }

    async findAllByUserId(userId) {
        const result = await Workspace.findAll({
            
            include: {
                model: User,
                where: {
                    id: userId
                }
            }
        });
        
        if(result == null || result.length == 0) {
            const error = new Error(`There are not workspaces registered yet`);
            error.status = 404;
            throw error;
        };

        return result.map((element, index)=> {
            return new WorkspaceBO(element.dataValues.id, element.dataValues.title, element.dataValues.description)
        });
    }

    async findAllBoards(id) {
        await this.findOne(id);

        // find board with all cards
        const result = await Workspace.findOne({
            where: {
                id: id
            },
            include:[{
                model: Board,
                as: 'boards'
            }],
        });
        
        const boards = result.boards;

        if(boards == null || boards.length == 0) {
            const error = new Error(`There are not boards registered yet`);
            error.status = 404;
            throw error;
        };

        // convert cards to CardBO
        return boards.map((board) => {
            return new BoardBO(board.id, board.title, board.description);
        });
    }
}