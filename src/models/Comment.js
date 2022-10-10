import {connection } from "../data/connection.js";
import {STRING,BIGINT} from "sequelize";

export const Comment = connection.define('Comment',{
    id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true,
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
    }
},{
    tableName:'comment'
});

Comment.sync()
  .then(() => console.log("Create Comment table"))
  .catch((err) => console.log(err));

export default Comment;