import Card from "./Card.js";
import Tag from "./Tag.js";

export default class TagsCards {
    constructor(id, card, tag){
        this._id = id;
        this._card = card;
        this._tag = tag;
    }

    get id(){
        return this._id;
    }
    get card(){
        return this._card;
    }
    get tag(){
        return this._tag;
    }

    set card(card){
        // Validate card is not empty and is a card object
        if (card !== undefined && card instanceof Card){
            this._card = card;
            return;
        }
        throw new Error("Invalid card");
    }

    set tag(tag){
        // Validate tag is not empty and is a tag object
        if (tag !== undefined && tag instanceof Tag){
            this._tag = tag;
            return;
        }
        throw new Error("Invalid tag");
    }
}

