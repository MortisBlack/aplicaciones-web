import Board from "./Board.js";

export default class Column {
    constructor(id, title, position, board){
        this._id = id;
        this._title = title;
        this._board = board;
        this._position = position;
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

    get position(){
        return this._position;
    }

    set title(title){
        if (typeof title === "string" && title.length > 0 && title.length <= 255){
            this._title = title;
            return;
        }

        throw new Error("Invalid title");
    }

    set position(position){
        if (typeof position === "number" && position >= 0){
            this._position = position;
            return;
        }
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
            position: this.position,
            BoardId: this.board.id
        }
    }

    toJson(){
        return {
            id: this.id,
            title: this.title,
            position: this.position,
            board: this.board

        }
    }
}

