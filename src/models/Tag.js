import {connection } from "../data/connection.js";
import {Sequelize,STRING,BIGINT} from "sequelize";

export const tag = connection.define('tag',{
    id:{type:BIGINT,primaryKey: true, allowNull: false, unique: true},
    name: {type: STRING, max:255, allowNull: false},
    color_tag: {type: STRING, max:255, allowNull: false},
},{
    tableName:'tag'
});