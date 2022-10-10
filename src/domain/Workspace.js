export default class Workspace {
    constructor(id, title, description){
        this._id = id;
        this._title = title;
        this._description = description;
    }
    // Create all getters and setters for the properties with their validations
    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
    }
    get title(){
        return this._title;
    }

    set title(title){
        if(title.length > 0 && title.length < 255 && typeof title === 'string'){
            this._title = title;
        }
        throw new Error('Title is not valid');
    }

    get description(){
        return this._description;
    }
    set description(description){
        if(description === undefined){
            return;
        }
        if(description.length < 255 && typeof description === 'string'){
            this._description = description;
        }
        throw new Error('Description is not valid');
    }

}

