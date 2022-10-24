import {connection } from "../data/connection.js";
import {DATE,STRING,BIGINT} from "sequelize";
import Column from "./Column.js";


const Card = connection.define('Card',{
    id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: STRING, 
        max:255, 
        allowNull:false
    },
    description:{
        type:STRING,
        MAX:255,
        allowNull:true
    },
    deadline_date:{
        field:'deadline_date',
        type:DATE,
        allowNull:true
    },
    ColumnId:{
        type:BIGINT,
        allowNull:false
    }
},{
    tableName:'card'
});

Column.hasMany(Card, {
    as: 'cards'
});

Card.belongsTo(Column, {
    as: 'Column',
});

Card.sync()
.then(()=> console.log('Create Card table'))
.catch((err)=> console.log(err))

export default Card