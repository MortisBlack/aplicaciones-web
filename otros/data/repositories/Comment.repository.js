import {Comment} from '../../models/Comment.js';

export default class CommentRepository {


    async create(comment) {
        
        const result = await Comment.create(comment);
        await result.reload();
        return result;
        
    }

    async update(comment) {

        if(comment.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await Comment.update(comment, {
            where: {
                id: comment.id
            }
        });
        return result;
        
    }

    async delete(id) {
        
        const result = await Comment.destroy({
            where: {
                id: id
            }
        });
        return result;
        
    }

    async findOne(id) {
        
        const result = await Comment.findOne({
            where: {
                id: id
            }
        });
        return result;
        
    }

    async findAll() {
        
        const result = await Comment.findAll();
        return result;
        
    }
}

