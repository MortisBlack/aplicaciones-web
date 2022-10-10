import { connection } from "../data/connection.js";
import {BIGINT} from "sequelize";
import {User} from "User.js";
import {UserType} from "UserType.js";
import {Workspace} from "Workspace.js";


export const userWorkspaces = connection.define('userWorkspaces',{
    id:{type: BIGINT,primaryKey: true,allowNull: false, unique: true},
    user_id:{type: User,allowNull: false,key, foreignKey: true,unique: true},
    userType_id:{type: UserType,allowNull: false,foreignKey: true,unique: true},
    workspace_id:{type: Workspace,allowNull: false,foreignKey: true,unique: true},
},{
    tableName:'user_workspaces'
});