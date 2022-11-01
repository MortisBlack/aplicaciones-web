import CardRepository from '../data/repositories/Card.repository.js';
import CardBO from '../domain/Card.js';
import ColumnBO from '../domain/Column.js';

const cardRepository = new CardRepository();

export default class CardController {
    async createCard(req, res, next) {
        try {
            const {
                title,
                description,
                deadline_date,
                column
            } = req.body;

            const card = new CardBO(
                undefined,
                title,
                description,
                deadline_date,
                new ColumnBO (
                    column,
                    undefined,
                    undefined
                )
            );

            let result = await cardRepository.create(card);
    
            if(result) {
                res.status(200).send({
                    message: "Card creataed successfully",
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The column ${column} doesn't exist`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    };

    async updateCard(req, res, next){
        try {
            const {
                title,
                description,
                deadline_date,
                column
            } = req.body;
    
            const { id } = req.params;
    
            const card = new CardBO(
                    id,
                    title,
                    description,
                    deadline_date,
                    new ColumnBO (
                        column,
                        undefined,
                        undefined
                    )
                );

            let result = await cardRepository.update(card);
    
            if(result == "card") {
                res.status(404).send({
                    message: `The card ${card} doesn't exist`
                });
            } else if (result == "column") {
                res.status(404).send({
                    message: `The column ${id} doesn't exist`
                });
            } else {
                res.status(200).send({
                    message: "Card updated successfully",
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

    async deleteCard(req, res, next){
        try {
            const {id} = req.params;

            let result = await cardRepository.delete(id);

            if(result) {
                res.status(200).send({
                    message: "Card deleted successfully"
                });
            } else {
                res.status(404).send({
                    message: `The card ${id} doesn't exist`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async getAllCards(req, res, next){
        try {
            let result = await cardRepository.findAll();

            if(result) {
                res.status(200).send({
                    message: "Cards fetched successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `There are not cards registered yet`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async findOneCard(req, res, next){
        try {
            const {id} = req.params;

            let result = await cardRepository.findOne(id);

            if(result) {
                res.status(200).send({
                    message: "Card fetched successfully",
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The card ${id} doesn't exist`
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