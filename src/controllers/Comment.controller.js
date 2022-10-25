import CommentRepository from '../data/repositories/Comment.repository.js';
import CommentBO from '../domain/Comment.js';

import UserBO from '../domain/User.js';
import CardBO from '../domain/Card.js';

const commentRepository = new CommentRepository();

export default class CommentController {
    async createComment(req, res, next) {
        try {
            const {
                comment,
                image,
                user,
                card
            } = req.body;

            const commentNew = new CommentBO(
                undefined,
                comment,
                image,
                new UserBO (
                    user,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined
                ),
                new CardBO(
                    card,undefined,undefined,undefined,undefined
                )
            );

            console.log(commentNew);

            let result = await commentRepository.create(commentNew);

            if(result == "card") {
                res.status(404).send({
                    message: `The card ${card} doesn't exist`
                });
            } else if(result == "user") {
                res.status(404).send({
                    message: `The user ${user} doesn't exist`
                });
            } else {
                res.status(200).send({
                    message: "Comment creataed successfully",
                    result: result
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    };

    async updateComment(req, res, next){
        try {
            const {
                comment,
                image,
                user,
                card
            } = req.body;
    
            const {id} = req.params;
            

            const commentNew = new CommentBO(
                id,
                comment,
                image,
                new UserBO (
                    user,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined
                ),
                new CardBO(
                    card,undefined,undefined,undefined,undefined
                )
            );

            let result = await commentRepository.update(commentNew);
    
            if(result == "comment") {
                res.status(404).send({
                    message: `The comment ${id} doesn't exist`
                });
                
            } else if(result == "user") {
                res.status(404).send({
                    message: `The user ${user} doesn't exist`
                });
            } else if(result == "card") {
                res.status(404).send({
                    message: `The card ${card} doesn't exist`
                });
            } else {
                res.status(200).send({
                    message: "Comment updated successfully",
                    result: result
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }   
    };

    async deleteComment(req, res, next){
        try {
            const {id} = req.params;

            let result = await commentRepository.delete(id);

            if(result) {
                res.status(200).send({
                    message: "Comment deleted successfully"
                });
            } else {
                res.status(404).send({
                    message: `The comment ${id} doesn't exist`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async getAllComments(req, res, next){
        try {
            let result = await commentRepository.findAll();

            if(result) {
                res.status(200).send({
                    message: "Comments fetched successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `There are not comments registered yet`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async findOneComment(req, res, next){
        try {
            const {id} = req.params;

            let result = await commentRepository.findOne(id);

            if(result) {
                res.status(200).send({
                    message: "Card fetched successfully",
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The comment ${id} doesn't exist`
                });
            }

        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }
}