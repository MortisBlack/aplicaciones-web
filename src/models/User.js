import { connection } from "../data/connection.js";
import {STRING,BIGINT} from "sequelize";

export const workspace = connection.define('workspace',{
    id:{type: BIGINT,primaryKey: true,allowNull: false, unique: true},
    username: {type: STRING, max:255, allowNull: false},
    password: {type: STRING, max:255, allowNull: false},
    name: {type: STRING, max:255, allowNull: false},
    first_surname: {type: STRING, max:255, allowNull: false},
    second_surname: {type: STRING, max:255, allowNull: false},
    email: {type: STRING, max:255, allowNull: false},
    phone: {type: STRING, max:255, allowNull: false},
    img_profile: {type: STRING, max:255, allowNull: false},
    birthdate: {type: STRING, max:255, allowNull: false},
},{
    tableName:'workspace'
});