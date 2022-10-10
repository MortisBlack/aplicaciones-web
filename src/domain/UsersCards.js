export default class UsersCards {
    constructor(id, user, card){
        this._id = id;
        this._user = user;
        this._card = card;
    }

    get id(){
        return this._id;
    }
    get user(){
        return this._user;
    }
    get card(){
        return this._card;
    }

    set user(user){
        // Validate user is not empty and is a user object
        if (user !== undefined && user instanceof user){
            this._user = user;
        }
        throw new Error("Invalid user");
        
    }

    set card(card){
        // Validate card is not empty and is a card object
        if (card !== undefined && card instanceof card){
            this._card = card;
        }
        throw new Error("Invalid card");
        
    }
}