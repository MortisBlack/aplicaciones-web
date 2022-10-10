export default class UserType {
    constructor(id, user_type){
        this._id = id;
        this._user_type = user_type;
    }

    get id(){
        return this._id;
    }
    get userType(){
        return this._user_type;
    }

    set id(id){
        this._id = id;
    }

    set userType(user_type){
        if(user_type.length > 0 && user_type.length < 255 && user_type !== undefined){
            this._user_type = user_type;
        }
        throw new Error("Invalid user type");
    }
}
