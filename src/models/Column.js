import { connection } from "../data/connection.js";
import {Sequelize,STRING,BIGINT} from "sequelize";
import{Board} from "Board.js";

export const column = connection.define('column',{
    id:{type:BIGINT,primaryKey: true, allowNull: false, unique: true},
    title: {type: STRING, max:255, allowNull: false},
    board_id:{type: Board,allowNull: false,foreignKey: true,unique: true},
},{
    tableName:'column'
});