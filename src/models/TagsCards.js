import {connection } from "../data/connection.js";
import {Sequelize,STRING,BIGINT} from "sequelize";
import {Card} from "Card.js";
import {Tag} from "Tag.js";

export const tagCard = connection.define('tagCard',{
    id:{type:BIGINT,primaryKey: true, allowNull: false, unique: true},
    card_id:{type:Card,allowNull:false,foreignKey: true,unique: true},
    tag_id:{type:Tag,allowNull:false,foreignKey: true,unique: true},
   
},{
    tableName:'tag_card'
});