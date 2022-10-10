import User from "./User";
import Board from "./Board";

export default class UsersBoards {
    constructor(id, user, board){
        this._id = id;
        this._user = user;
        this._board = board;
    }

    get id(){
        return this._id;
    }
    get user(){
        return this._user;
    }
    get board(){
        return this._board;
    }

    set user(user){
        // Validate user is not empty and is a user object
        if (user !== undefined && user instanceof user){
            this._user = user;
        }

        throw new Error("Invalid user");
    }

    set board(board){
        // Validate board is not empty and is a board object
        if (board !== undefined && board instanceof board){
            this._board = board;
        }

        throw new Error("Invalid board");
    }
}