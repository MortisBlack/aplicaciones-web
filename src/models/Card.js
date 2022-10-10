import {connection } from "../data/connection.js";
import {DATE,STRING,BIGINT} from "sequelize";


export const card = connection.define('card',{
    id:{type:BIGINT,primaryKey: true, allowNull: false, unique: true},
    tite:{type: STRING, max:255, allowNull:false},
    description:{type:STRING,MAX:255,allowNull:false},
    deadline_date:{TYPE:DATE,allowNull:false},
},{
    tableName:'card'
});