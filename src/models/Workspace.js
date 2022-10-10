import { connection } from "../data/connection.js";
import {STRING,BIGINT} from "sequelize";

export const workspace = connection.define('workspace',{
    id:{type: BIGINT,primaryKey: true,allowNull: false, unique: true},
    title: {type: STRING, max:255, allowNull: false},
    description: {type: STRING, max:500, allowNull: false},
},{
    tableName:'workspace'
});

