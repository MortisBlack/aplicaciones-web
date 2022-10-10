import {connection } from "../data/connection.js";
import {STRING,BIGINT} from "sequelize";
import {User} from "User.js";
import{Card} from "Card.js";

export const usersCards = connection.define('usersCards',{
    id:{type:BIGINT,primaryKey: true, allowNull: false, unique: true},
    user_id:{type: User,allowNull: false,foreignKey: true,unique: true},
    card_id:{type:Card,allowNull:false,foreignKey: true,unique: true},
},{
    tableName:'users_cards'
});