import Board from '../../models/Board.js';
import Workspace from '../../models/Workspace.js';
import BoardBO from '../../domain/Board.js';
import WorkspaceRepository from './Workspace.repository.js';
import Column from '../../models/Column.js';
import ColumnBO from '../../domain/Column.js';

const workspaceRepository = new WorkspaceRepository();


export default class BoardRepository {

    async create(board) {
        const workspace = await workspaceRepository.findOne(board.workspace.id);
        
        const boardBO = board.toPersistenceObject();
        const result = await Board.create(boardBO);
        return new BoardBO(
            result.id, 
            result.title, 
            result.description, 
            workspace);
    }

    async update(board) {
        if(board.id == undefined){
            const error = new Error(`id is undefined`);
            error.status = 404;
            throw error;
        };
        
        await this.findOne(board.id);
        await workspaceRepository.findOne(board.workspace.id)
        
        const boardBO = board.toPersistenceObject()

        await Board.update(boardBO, {
            where: {
                id: board.id
            },
            include:Workspace
        });
        
        console.log(board.id);
        return this.findOne(board.id);
    }

    async delete(id) {
        await this.findOne(id);

        const result = await Board.destroy({
            where: {
                id: id
            }
        });
        return "Board successfully deleted";
    }

    async findOne(id) {

        const result = await Board.findOne({
            where: {
                id: id
            },
            include:[{
                model: Workspace, attributes:
                    ['id', 'title', 'description'],
                as: 'Workspace'
            }]
        
        });

        if(result == null) {
            const error = new Error(`The board ${id} doesn't exist`);
            error.status = 404;
            throw error;
        };

        let workspace = await workspaceRepository.findOne(result.WorkspaceId);

        return new BoardBO(result.id, result.title, result.description, workspace);
    }

    async findAll() {  
        const result = await Board.findAll({
            include:[{
                model: Workspace,
                as: 'Workspace'
            }]
        });


        if(result == null || result.length == 0) {
            const error = new Error(`There are not boards registered yet`);
            error.status = 404;
            throw error;
        };


        return await Promise.all( result.map(async (element, index)=> {
            let workspace = await workspaceRepository.findOne(element.dataValues.WorkspaceId)
            return new BoardBO(element.dataValues.id, element.dataValues.title, element.dataValues.description, workspace);
        }));
    }

    async findAllByUserId(userId) {
        const result = await Board.findAll({
            
            include: [{
                model: UsersBoards,
                through: { 
                    attributes: [],
                    where: {
                        UserId: userId
                    },
                }
            }]
        });

        if(result == null || result.length == 0) {
            const error = new Error(`There are not boards registered yet`);
            error.status = 404;
            throw error;
        };

        return await Promise.all( result.map(async (element, index)=> {
            let workspace = await workspaceRepository.findOne(element.dataValues.WorkspaceId)
            return new BoardBO(element.dataValues.id, element.dataValues.title, element.dataValues.description, workspace);
        }));
    }

    async findAllColumns(id) {
        await this.findOne(id);

        // find board with all columns
        const result = await Board.findOne({
            where: {
                id: id
            },
            include:[{
                model: Column,
                as: 'columns'
            }],
        });
        
        const columns = result.columns;

        if(columns == null || columns.length == 0) {
            const error = new Error(`There are not columns registered yet`);
            error.status = 404;
            throw error;
        };

        // convert columns to ColumnBO
        return columns.map((column) => {
            return new ColumnBO(column.id, column.title);
        });
    }
}
