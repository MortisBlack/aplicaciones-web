import Card from "./Card";

export default class ImageCard {
    constructor(id, image, card){
        this._id = id;
        this._image = image;
        this._card = card;
    }

    get id (){
        return this._id;
    }
    get image (){
        return this._image;
    }
    get card (){
        return this._card;
    }
    set image(image){
        if (typeof image === "string" && image.length > 0 && image.length <= 55){
            this._image = image;
            return;
        }
        throw new Error("Invalid image");
    }
    set card(card){
        if (card !== undefined && card instanceof Card){
            this._card = card;
            return;
        }
        throw new Error("Invalid card");
    }
}
