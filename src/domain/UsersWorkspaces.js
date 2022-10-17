import Workspace from "./Workspace";
import UserType from "./UserType";
import User from "./User";

export default class UserWorkspaces{
    constructor(id, user, user_type, workspace ){
        this._id = id;
        this._user = user;
        this._user_type = user_type;
        this._workspace = workspace;
    }
    get id(){
        return this._id;
    }
    get user(){
        return this._user;
    }
    get userType(){
        return this._user_type;
    }
    get workspace(){
        return this._workspace;
    }
    set user(user){
        // Validate user is not empty and is a user object
        if (user !== undefined && user instanceof user){
            this._user = user;
            return;
        }
        
        throw new Error("Invalid user");
    }
    set userType(user_type){
        // Validate user is not empty and is a user object
        if (user_type !== undefined && user_type instanceof user_type){
            this._user_type = user_type;
            return;
        }
        
        throw new Error("Invalid user type");
    }
    set workspace(workspace){
        // Validate workspace is not empty and is a workspace object
        if (workspace !== undefined && workspace instanceof workspace){
            this._workspace = workspace;
            return;
        }

        throw new Error("Invalid workspace");
    }
  
}