import {connection } from "../data/connection.js";
import {STRING,BIGINT} from "sequelize";
import Card from "./Card.js"

export const ImageCard = connection.define('ImageCard',{
    id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    image:{type: STRING,
        max:55,
        allowNull: true
    }
},{
    tableName:'image_card'
});

Card.hasMany(ImageCard, { as: "images" });
ImageCard.hasOne(Card, { as: "card" });

ImageCard.sync()
  .then(() => console.log("Create ImageCard table"))
  .catch((err) => console.log(err));

export default ImageCard;