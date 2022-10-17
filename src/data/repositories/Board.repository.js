import Board from '../../models/Board.js';
import Workspace from '../../models/Workspace.js';
import BoardBO from '../../domain/Board.js';
import WorkspaceRepository from './Workspace.repository.js';

const workspaceRepository = new WorkspaceRepository();


export default class BoardRepository {

    async create(board) {
        const boardBO = board.toPersistenceObject();
        const result = await Board.create(boardBO);
        const workspace = await workspaceRepository.findOne(result.WorkspaceId);
        return new BoardBO(result.id, result.title, result.description, workspace);
    }

    async update(board) {

        if(board.id === undefined){
            throw new Error('id is undefined');
        }

        const boardBO = board.toPersistenceObject()
        await Board.update(boardBO, {
            where: {
                id: board.id
            },
            include:Workspace
        });
        return this.findOne(board.id);
    }

    async delete(id) {
        
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
        return await result.map(async (element, index)=> {
            let workspace = await workspaceRepository.findOne(element.dataValues.WorkspaceId);
            new BoardBO(element.dataValues.id, element.dataValues.title, element.dataValues.description, workspace)
        });
    }
}
