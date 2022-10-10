import { connection } from "../data/connection.js";
import {Sequelize,STRING,BIGINT} from "sequelize";

export const userType = connection.define('userType',{
    id:{type: BIGINT,primaryKey: true,allowNull: false, unique: true},
    user_type: {type: STRING, max:500, allowNull: false},
},{
    tableName:'user_type'
});