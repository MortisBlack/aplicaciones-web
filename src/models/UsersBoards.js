import {connection } from "../data/connection.js";
import {STRING,BIGINT} from "sequelize";
import {User} from "User.js";
import{Board} from "Board.js";

export const usersBoards = connection.define('usersBoards',{
    id:{type:BIGINT,primaryKey: true, allowNull: false, unique: true},
    user_id:{type: User,allowNull: false,foreignKey: true,unique: true},
    board_id:{type:Board,allowNull:false,foreignKey: true,unique: true},
},{
    tableName:'users_boards'
});