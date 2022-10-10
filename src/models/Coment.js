import {connection } from "../data/connection.js";
import {Sequelize,STRING,BIGINT} from "sequelize";

export const coment = connection.define('coment',{
    id:{type:BIGINT,primaryKey: true, allowNull: false, unique: true},
    coment: {type: STRING, max:1000, allowNull: false},
    image: {type: STRING, max:55, allowNull: true},
    
},{
    tableName:'coment'
});