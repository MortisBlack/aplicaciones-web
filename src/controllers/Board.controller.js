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
                message: "Board creataed successfully",
                result: result
            });
        } catch (err) {
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
                    id,
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
            next(err)
        }   
    };

    async deleteBoard(req, res, next){
        try {
            const {id} = req.params;

            let result = await boardRepository.delete(id);

            res.status(200).send({
                message: "Board deleted successfully"
            });
        } catch (err) {
            next(err)
        }
    }

    async updateBoardTitle(req, res, next){
        try {
            const {title} = req.body;
            const {id} = req.params;
            
            let result = await boardRepository.updateTitle(id, title);
            res.status(200).send({
                message: "Board updated successfully",
                result: result
            });
        } catch (err) {
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
            next(err)
        }
    }

    async findOneBoard(req, res, next){
        try {
            const {id} = req.params;

            let result = await boardRepository.findOne(id);

            res.status(200).send({
                message: "Board fetched successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }
    }

    async findAllColumns(req, res, next){

        try {
            const {id} = req.params;

            let result = await boardRepository.findAllColumns(id);
            res.status(200).send({
                message: "Columns fetched successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }
    }
}