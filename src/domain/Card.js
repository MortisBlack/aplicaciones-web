import Column from "./Column.js";

export default class Card {
    constructor(id, title, description, deadline_date, column, position, createdAt, updatedAt){
        this._id = id;
        this._title = title;
        this._description = description;
        this._deadline_date = deadline_date;
        this._column = column;
        this._position = position;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
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

    get deadline_date(){
        return this._deadline_date;
    }

    get column(){
        return this._column;
    }

    get position(){
        return this._position;
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

    set deadline_date(deadline_date){
        if (deadline_date === undefined){
            return
        }
        
        // Validate date instance
        if(deadline_date instanceof Date){
            this._deadline_date = deadline_date;
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

    set position(position){
        if (position === undefined){
            return
        }
        // Validate position is a number
        if(typeof position === 'number'){
            this._position = position;
            return;
        }
        
        throw new Error('Position must be a number');
    }
    
    get createdAt(){
        return this._createdAt;
    }

    get updatedAt(){
        return this._updatedAt;
    }

    toPersistenceObject(){
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            deadline_date: this._deadline_date,
            ColumnId: this._column.id,
            position: this._position
        }
    }

}
