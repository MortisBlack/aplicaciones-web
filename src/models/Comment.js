import {connection } from "../data/connection.js";
import {STRING,BIGINT} from "sequelize";

import User from './User.js';
import Card from './Card.js';

export const Comment = connection.define('Comment',{
    id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    comment: {
        type: STRING, 
        max:1000, 
        allowNull: false
    },
    image: {
        type: STRING,
        max:55,
        allowNull: true
    },
    UserId:{
        type:BIGINT,
        allowNull:false
    },
    CardId:{
        type:BIGINT,
        allowNull:false
    }
},{
    tableName:'comment'
});

User.hasMany(Comment, { as: "comments" });
Comment.belongsTo(User, { 
    as: "User",
});

Card.hasMany(Comment, { as: "comments" });
Comment.belongsTo(Card, { 
    as: "Card",
});

Comment.sync({alter:true})
  .then(() => console.log("Create Comment table"))
  .catch((err) => console.log(err));

export default Comment;