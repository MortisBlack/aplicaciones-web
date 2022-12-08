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
    
            res.status(200).send({
                message: "Card creataed successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }
    };

    async updateCard(req, res, next){
        try {
            const {
                title,
                description,
                deadline_date,
                column,
                position
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
                    ),
                    position
                );

            let result = await cardRepository.update(card);
    
            res.status(200).send({
                message: "Card updated successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }   
    };

    async deleteCard(req, res, next){
        try {
            const {id} = req.params;

            let result = await cardRepository.delete(id);

            res.status(200).send({
                message: "Card deleted successfully"
            });
        } catch (err) {
            next(err)
        }
    }

    async getAllCards(req, res, next){
        try {
            let result = await cardRepository.findAll();

            res.status(200).send({
                message: "Cards fetched successfully", 
                result: result
            });
        } catch (err) {
            next(err)
        }
    }

    async findOneCard(req, res, next){
        try {
            const {id} = req.params;

            let result = await cardRepository.findOne(id);

            res.status(200).send({
                message: "Card fetched successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }
    }
}