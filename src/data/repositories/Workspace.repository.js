import Workspace from '../../models/Workspace.js';
import User from '../../models/User.js';
import WorkspaceBO from '../../domain/Workspace.js';
import Board from '../../models/Board.js';
import BoardBO from '../../domain/Board.js';

export default class WorkspaceRepository {


    async create(workspace) {
        const workspaceBO = workspace.toPersistenceObject()
        const result = await Workspace.create(workspaceBO);

        return new WorkspaceBO(result.id, result.title, result.description);
    }

    async update(workspace) {

        if(workspace.id === undefined){
            const error = new Error('id is undefined');
            error.status = 404;
            throw error;
        }

        const workspaceCheck = await this.findOne(workspace.id);

        if(workspaceCheck == undefined) {
            const error = new Error(`The workspace ${id} doesn't exist`);
            error.status = 404;
            throw error;
        }

        const workspaceBO = workspace.toPersistenceObject()
        const result = await Workspace.update(workspaceBO, {
            where: {
                id: workspace.id
            }
        });
        return this.findOne(workspace.id);
    }

    async delete(id) {
        const workspaceCheck = await this.findOne(id);

        if(workspaceCheck == undefined) {
            const error = new Error(`The workspace ${id} doesn't exist`);
            error.status = 404;
            throw error;
        }

        const result = await Workspace.destroy({
            where: {
                id: id
            }
        });

        return "Workspace successfully deleted";
    }

    async findOne(id) {
        
        const result = await Workspace.findOne({
            where: {
                id: id
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
        const workspaceCheck = await this.findOne(id);

        if(workspaceCheck == undefined) {
            const error = new Error(`The workspace ${id} doesn't exist`);
            error.status = 404;
            throw error;
        }

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

        // convert cards to CardBO
        return boards.map((board) => {
            return new BoardBO(board.id, board.title, board.description);
        });
    }
}