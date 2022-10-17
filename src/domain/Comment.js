import User from "./User.js";
import Card from "./Card.js";

export default class Comment {
    constructor(id, comment, image, user, card){
        this._id = id;
        this._comment = comment;
        this._image = image;
        this._user = user;
        this._card = card;
    }


    get id (){
        return this._id;
    }
    get comment (){
        return this._comment;
    }
    get image(){
        return this._image;
    }

    get user(){
        return this._user;
    }

    get card(){
        return this._card;
    }

    set comment(comment){
        if (typeof comment === "string" && comment.length > 0 && comment.length <= 1000){
            this._comment = comment;
            return;
        }
        throw new Error("Comment must be a string between 1 and 1000 characters");
    }
    set image(image){
        if (image === undefined){
            return;
        }
        if (typeof image === "string" && image.length > 0 && image.length <= 55){
            this._image = image;
            return;
        }
        throw new Error("Image must be a string between 1 and 55 characters");
    }

    set user(user){
        if (typeof user === User){
            this._user = user;
            return;
        }
        throw new Error("User an instance of User");
    }

    set card(card){
        if (typeof card === Card){
            this._card = card;
            return;
        }
        throw new Error("Card an instance of Card");
    }
    
}


