import Board from "./Board";

export default class Column {
    constructor(id, title, board){
        this._id = id;
        this._title = title;
        this._board = board;
    }


    get id (){
        return this._id;
    }
    get title (){
        return this._title;
    }
    get board(){
        return this._board;
    }

    set title(title){
        if (typeof title === "string" && title.length > 0 && title.length <= 255){
            this._title = title;
            return;
        }

        throw new Error("Invalid title");
    }

    set board(board){
        // Validate board is not empty and is a board object
        if (board !== undefined && board instanceof Board){
            this._board = board;
            return;
        }

        throw new Error("Invalid board");
    }

    toPersistenceObject(){
        return {
            id: this.id,
            title: this.title,
            BoarId: this.board.id
        }
    }
}

