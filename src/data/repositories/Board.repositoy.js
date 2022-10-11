import { Board } from '../models/Board.js';
import BoardBO from '../../domain/Board.js';
import Workspace from '../../models/Workspace.js';

class BoardRepository {

    async create(board) {
        const boardBO = board.toPersistenceObject();
        const result = await Board.create(boardBO);

        return new BoardBO(result.id, result.title, result.description, result.workspace);
    }

    async update(board) {

        if(board.id === undefined){
            throw new Error('id is undefined');
        }

        const boardBO = board.toPersistenceObject()
        const result = await Board.update(boardBO, {
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
            include:Workspace
        });
        return new BoardBO(result.id, result.title, result.description, result.workspace);
    }

    async findAll() {  
        const result = await Board.findAll({
            include:Workspace
        });
        return result.map(()=> {
            new BoardBO(result.dataValues.id, result.dataValues.title, result.dataValues.description, result.dataValues.workspace)
        });
    }
}

export { BoardRepository };