import { connection } from "../data/connection.js";
import {Sequelize,STRING,BIGINT} from "sequelize";
import {Workspace} from "Workspace.js";

export const board = connection.define('board',{
    id:{type:BIGINT,primaryKey: true, allowNull: false, unique: true},
    title: {type: STRING, max:255, allowNull: false},
    description:{type:STRING,allowNull:false,max:500},
    workspace_id:{type: Workspace,allowNull: false,foreignKey: true,unique: true},
},{
    tableName:'board'
});