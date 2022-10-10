import {connection} from "../data/connection.js";
import {BIGINT} from "sequelize";
import Card from "./Card.js";
import Tag from "./Tag.js";

const TagsCards = connection.define(
    'TagsCards', {
        id:{
            type: BIGINT,
            autoIncrement: true,
            primaryKey: true,
        }
        },{
            tableName:'tags_cards'
        });

Card.belongsToMany(Tag, {through: TagsCards });
Tag.belongsToMany(Card,{through: TagsCards});

TagsCards.sync()
    .then(()=> console.log('Create relation table between Cards and Tags'))
    .catch((err)=> console.log(err))

export default TagsCards;