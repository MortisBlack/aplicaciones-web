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
    
            if(result) {
                res.status(200).send({
                    message: "Board creataed successfully",
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The workspace ${workspace} doesn't exist`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
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
    
            if(result == "workspace") {
                res.status(404).send({
                    message: `The workspace ${workspace} doesn't exist`
                });
            } else if (result == "board") {
                res.status(404).send({
                    message: `The board ${id} doesn't exist`
                });
            } else {
                res.status(200).send({
                    message: "Board updated successfully",
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

    async deleteBoard(req, res, next){
        try {
            const {id} = req.params;

            let result = await boardRepository.delete(id);

            if(result) {
                res.status(200).send({
                    message: "Board deleted successfully"
                });
            } else {
                res.status(404).send({
                    message: `The board ${id} doesn't exist`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async getAllBoards(req, res, next){
        try {
            let result = await boardRepository.findAll();

            if(result) {
                res.status(200).send({
                    message: "Boards fetched successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `There are not boards registered yet`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async findOneBoard(req, res, next){
        try {
            const {id} = req.params;

            let result = await boardRepository.findOne(id);


            if(result) {
                res.status(200).send({
                    message: "Board fetched successfully",
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The board ${id} doesn't exist`
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