import Column from "./Column";

export default class Card {
    constructor(id, title, description, deadlineDate, column){
        this._id = id;
        this._title = title;
        this._description = description;
        this._deadlineDate = deadlineDate;
        this._column = column;
    }

    get id(){
        return this._id;
    }

    get title(){
        return this._title;
    }

    get description(){
        return this._description;
    }

    get deadlineDate(){
        return this._deadlineDate;
    }

    get column(){
        return this._column;
    }

    set title(title){
        // Validate string max length 500 and not empty
        if(typeof title === 'string' && title.length <= 500 && title.length > 0){
            this._title = title;
            return;
        }
        throw new Error('Title must be a string and not empty');
    }

    set description(description){
        // Validate string max length 500
        if(typeof description === 'string' && description.length <= 1000){
            this._description = description;
            return;
        }

        throw new Error('Description must be a string');
    }

    set deadlineDate(deadlineDate){
        if (deadlineDate === undefined){
            return
        }
        
        // Validate date instance
        if(deadlineDate instanceof Date){
            this._deadlineDate = deadlineDate;
            return;
        }

        throw new Error('Deadline date must be a date');
    }

    set column(column){
        // Validate column instance
        if(column instanceof Column){
            this._column = column;
            return;
        }

        throw new Error('Column must be a column');
    }

}
