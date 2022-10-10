import { Board } from '../models/Board.js';
import BoardBO from '../../domain/Board.js';

class BoardRepository {

    async create(board) {
        const boardBO = board.toPersistenceObject();
        const result = await Board.create(boardBO);
        await result.reload();

        return result;
    }

    async update(board) {

        if(board.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await Board.update(board, {
            where: {
                id: board.id
            }
        });
        return result;
    }

    async delete(id) {
        
        const result = await Board.destroy({
            where: {
                id: id
            }
        });
        return result;
    }

    async findOne(id) {
        
        const result = await Board.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async findAll() {  
        const result = await Board.findAll();
        return result.map(()=> {
            new BoardBO(result.id, result.title, result.description, result.workspace)
        });
    }
}

export { BoardRepository };