import Comment from '../../models/Comment.js';
import CommentBO from '../../domain/Comment.js';

import User from '../../models/User.js';
import UserRepository from './User.repository.js';
import Card from '../../models/Card.js';
import CardRepository from './Card.repository.js';

const userRepository = new UserRepository();
const cardRepository = new CardRepository();

export default class CommentRepository {

    async create(comment) {
        const card = await cardRepository.findOne(comment.card.id);
        const user = await userRepository.findOne(comment.user.id);

        const commentBO = comment.toPersistenceObject();
        const result = await Comment.create(commentBO);
        return new CommentBO(
            result.id, 
            result.comment, 
            result.image, 
            user, 
            card
        );
    }

    async update(comment) {
        
        if(comment.id == undefined){
            const error = new Error(`id is undefined`);
            error.status = 404;
            throw error;
        };

        await this.findOne(comment.id);
        await userRepository.findOne(comment.user.id)
        await cardRepository.findOne(comment.card.id)
        
        const commentBO = comment.toPersistenceObject()

        await Comment.update(commentBO, {
            where: {
                id: comment.id
            },
            include:User, Card
        });

        return this.findOne(comment.id);
    }

    async delete(id) {
        await this.findOne(id);

        const result = await Comment.destroy({
            where: {
                id: id
            }
        });
        return "Comment successfully deleted";
    }

    async findOne(id) {

        const result = await Comment.findOne({
            where: {
                id: id
            },
            include:[{
                model: User, attributes:
                    ['id', 'username'],
                as: 'User',
                model: Card, attributes:
                    ['id'],
                as: 'Card',
            }]
        
        });

        if(result == null) {
            const error = new Error(`The comment ${id} doesn't exist`);
            error.status = 404;
            throw error;
        };
        
        let user = await userRepository.findOne(result.UserId);
        let card = await cardRepository.findOne(result.CardId);
        
        

        return new CommentBO(
            result.id,
            result.comment, 
            result.image,
            user, 
            card
        );
    }

    async findAll() {  
        const result = await Comment.findAll({
            include:[{
                model: User,
                as: 'User',
                model: Card,
                as: 'Card'
            }]
        });


        if(result == null || result.length == 0) {
            const error = new Error(`There are not comments registered yet`);
            error.status = 404;
            throw error;
        };


        return await Promise.all( result.map(async (element, index)=> {
            let user = await userRepository.findOne(element.dataValues.UserId)
            let card = await cardRepository.findOne(element.dataValues.CardId)
            return new CommentBO(
                element.dataValues.id,
                element.dataValues.comment,
                element.dataValues.image,
                user,
                card
            );
        }));
    }
}
