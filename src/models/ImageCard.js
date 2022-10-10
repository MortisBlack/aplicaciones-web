import {connection } from "../data/connection.js";
import {Sequelize,STRING,BIGINT} from "sequelize";
import {Card} from "Card.js"

export const imageCard = connection.define('imageCard',{
    id:{type:BIGINT,primaryKey: true, allowNull: false, unique: true},
    image:{type: STRING, max:55, allowNull: true},
    card_id:{type:Card,allowNull:false,foreignKey: true,unique: true},
},{
    tableName:'image_card'
});