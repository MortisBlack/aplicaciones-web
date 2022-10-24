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
    
            if(result) {
                res.status(200).send({
                    message: "Column creataed successfully",
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The board ${board} doesn't exist`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
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
    
            if(result == "board") {
                res.status(404).send({
                    message: `The board ${board} doesn't exist`
                });
            } else if (result == "column") {
                res.status(404).send({
                    message: `The column ${id} doesn't exist`
                });
            } else {
                res.status(200).send({
                    message: "Column updated successfully",
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

    async deleteColumn(req, res, next){
        try {
            const {id} = req.params;

            let result = await columnRepository.delete(id);

            if(result) {
                res.status(200).send({
                    message: "Column deleted successfully"
                });
            } else {
                res.status(404).send({
                    message: `The column ${id} doesn't exist`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async getAllColumns(req, res, next){
        try {
            let result = await columnRepository.findAll();

            if(result) {
                res.status(200).send({
                    message: "Columns fetched successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `There are not columns registered yet`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async findOneColumn(req, res, next){
        try {
            const {id} = req.params;

            let result = await columnRepository.findOne(id);


            if(result) {
                res.status(200).send({
                    message: "Column fetched successfully",
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The column ${id} doesn't exist`
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