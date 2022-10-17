import {UsersBoards} from '../../models/UsersBoards.js';

export default class UsersBoardsRepository {


    async create(userBoard) {
        
        const result = await UsersBoards.create(userBoard);
        await result.reload();
        return result;
    }

    async update(userBoard) {

        if(userBoard.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await UsersBoards.update(userBoard, {
            where: {
                id: userBoard.id
            }
        });
        return result;
    }

    async delete(id) {
        
        const result = await UsersBoards.destroy({
            where: {
                id: id
            }
        });
        return result;
    }

    async findOne(id) {
        
        const result = await UsersBoards.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async findAll() {
        
        const result = await UsersBoards.findAll();
        return result;
    }
}

