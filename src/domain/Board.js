import Workspace from "./Workspace";

export default class Board {
    constructor(id, title, description, workspace){
        this._id = id;
        this._title = title;
        this._description = description;
        this._workspace = workspace;
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

    get workspace(){
        return this._workspace;
    }

    set title(title){
        // Validate string title is not empty and max length is 255
        if (typeof title === "string" && title.length > 0 && title.length <= 255){
            this._title = title;
        }

        throw new Error("Title must be a string and not empty");
    }

    set description(description){
        // can be null
        if (description === undefined) return
        // Validate string description is not empty and max length is 255
        if (typeof description === "string" && description.length <= 255){
            this._description = description;
        }

        throw new Error("Description must be a string");
    }

    set workspace(workspace){
        // Validate workspace is not empty and is a Workspace object
        if (workspace !== undefined && workspace instanceof Workspace){
            this._workspace = workspace;
        }

        throw new Error("Workspace must be a Workspace object");
    }

    toPersistenceObject(){
        return {
            title: this._title,
            description: this._description
        }
    }

}
