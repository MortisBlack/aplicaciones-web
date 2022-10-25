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

        if(card == undefined) {
            return "card";
        }

        const user = await userRepository.findOne(comment.user.id);

        if(user == undefined) {
            return "user";
        }

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
            throw new Error('id is undefined');
        };

        const commentCheck = await this.findOne(comment.id);
        
        if(commentCheck == undefined) {
            return "comment";
        };

        const userCheck = await userRepository.findOne(comment.user.id)
        
        if(userCheck == undefined ) {
            return "user";
        };

        const cardCheck = await cardRepository.findOne(comment.card.id)
        
        if(cardCheck == undefined ) {
            return "card";
        };
        
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
        const commentCheck = await this.findOne(id);

        if(commentCheck == undefined) {
            return undefined;
        }

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
            return undefined;
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
            return undefined;
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
