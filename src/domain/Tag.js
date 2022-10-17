import Board from "./Board";

export default class Tag {
    constructor(id, name, color, board){
        this._id = id;
        this._name = name;
        this._color_tag = color;
        this._board = board;
    }

    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }
    get color(){
        return this._color;
    }

    set name(name){
        // Validate string name is not empty and max length is 255
        if (typeof name === "string" && name.length > 0 && name.length <= 255){
            this._name = name; 
            return;
        }
        throw new Error("Invalid name");
    }
    set color(color){
        // Validate string color_tag is not empty and max length is 255
        if (typeof color === "string" && color.length > 0 && color.length <= 6){
            this._color = color;
            return;
        }

        throw new Error("Invalid color");
    }

    get board(){
        return this._board;
    }

    set board(board){
        if (board instanceof Board && board !== undefined){
            this._board = board;
            return;
        }
        throw new Error("Invalid board");
    }
}
