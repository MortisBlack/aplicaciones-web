import ColumnRepository from '../data/repositories/Column.repository.js';
import ColumnBO from '../domain/Column.js';
import BoardBO from '../domain/Board.js';

const columnRepository = new ColumnRepository();

export default class ColumnController {
    async createColumn(req, res, next) {
        try {
            const {
                title,
                board
            } = req.body;

            const column = new ColumnBO(
                undefined,
                title,
                new BoardBO (
                    board,
                    undefined,
                    undefined,
                    undefined
                )
            );

            let result = await columnRepository.create(column);

            res.status(200).send({
                message: "Column creataed successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }
    };

    async updateColumn(req, res, next){
        try {
            const {
                title,
                board
            } = req.body;
    
            const {id} = req.params;
    
            const column = new ColumnBO(
                    id,
                    title,
                    new BoardBO (
                        board,
                        undefined,
                        undefined
                    )
                );

            let result = await columnRepository.update(column);
    
            res.status(200).send({
                message: "Column updated successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }   
    };

    async deleteColumn(req, res, next){
        try {
            const {id} = req.params;

            let result = await columnRepository.delete(id);

            res.status(200).send({
                message: "Column deleted successfully"
            });
        } catch (err) {
            next(err)
        }
    }

    async getAllColumns(req, res, next){
        try {
            let result = await columnRepository.findAll();

            res.status(200).send({
                message: "Columns fetched successfully", 
                result: result
            });
        } catch (err) {
            next(err)
        }
    }

    async findOneColumn(req, res, next){
        try {
            const {id} = req.params;

            let result = await columnRepository.findOne(id);

            res.status(200).send({
                message: "Column fetched successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }
    }

    async findAllCards(req, res, next){
        try {
            const {id} = req.params;

            let result = await columnRepository.findAllCards(id);

            res.status(200).send({
                message: "Cards fetched successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }
    }
}