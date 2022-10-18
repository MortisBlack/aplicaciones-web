import BoardBO from '../domain/Board.js';

import BoardRepository from '../repositories/Board.repository.js';



const boardRepository = new BoardRepository();

class BoardController{

    createBoard(req, res, next){
        //create board

        const board = new BoardBO(
            undefined,
            req.body.title,
            req.body.description,
            new WorkspaceBO(req.body.workspace)
        )

        const result = boardRepository.createBoard(board);

        res.send({
                'detail': 'Board created', 
                'board': result
            });
    }
}