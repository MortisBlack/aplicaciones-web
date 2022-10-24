import BoardRepository from '../data/repositories/Board.repository.js';
import BoardBO from '../domain/Board.js';
import WorkspaceBO from '../domain/Workspace.js';

const boardRepository = new BoardRepository();

export default class BoardController {
    async createBoard(req, res, next) {
        try {
            const {
                title,
                description,
                workspace
            } = req.body;

            const board = new BoardBO(
                undefined,
                title, 
                description,
                new WorkspaceBO (
                    workspace,
                    undefined,
                    undefined
                )
            );
            
            let result = await boardRepository.create(board);
    
            res.status(200).send({
                message: "Board created successfully",
                result: result
            });
        } catch (err) {
            err.message = 'Error creating board'
            next(err)
        }
    };

    async updateBoard(req, res, next){
        try {
            const {
                title,
                description,
                workspace
            } = req.body;
    
            const {id} = req.params;
    
            const board = new BoardBO(
                    title,
                    description,
                    new WorkspaceBO (
                        workspace,
                        undefined,
                        undefined
                    )
                );

            let result = await boardRepository.update(board);
    
            res.status(200).send({
                message: "Board updated successfully", 
                result: result
            });
        } catch (err) {
            err.message = 'Error updating board'
            next(err)
        }   
    };

    async deleteBoard(req, res, next){
        try {
            const {id} = req.params;

            let result = await boardRepository.delete(id);

            res.status(200).send({
                message: "Board deleted successfully", 
                result: result
            });
        } catch (err) {
            err.message = 'Error deleting board'
            next(err)
        }
    }

    async getAllBoards(req, res, next){
        try {
            let result = await boardRepository.findAll();

            res.status(200).send({
                message: "Boards fetched successfully", 
                result: result
            });
        } catch (err) {
            if(res.status(404)) {
                res.status(404).send({
                    message: err.message
                });
            } else {
                err.message = 'Error getting all boards'
                next(err)
            }
        }
    }

    async findOneBoard(req, res, next){
        try {
            const {id} = req.params;

            let result = await boardRepository.findOne(id);

            console.log(res.status);

            res.status(200).send({
                message: "Board fetched successfully", 
                result: result
            });
        } catch (err) {
            if(res.status(404)) {
                res.status(404).send({
                    message: err.message
                });
            } else {
                err.message = 'Error getting board'
                next(err)
            }
        }
    }
}