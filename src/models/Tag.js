import {connection } from "../data/connection.js";
import {STRING,BIGINT} from "sequelize";

const Tag = connection.define('Tag',{
    id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: STRING,
        max:255,
        allowNull: false
    },
    color: {
        type: STRING,
        max:6,
        allowNull: false
    }
},{
    tableName:'tag'
});

Tag.sync()
.then(()=> console.log('Create Tag table'))
.catch((err)=> console.log(err))

export default Tag