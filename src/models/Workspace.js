import { connection } from "../data/connection.js";
import {STRING,BIGINT} from "sequelize";

const Workspace = connection.define('Workspace',{
    id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: STRING, 
        max:255, 
        allowNull: false
    },
    description: {
        type: STRING, max:500, 
        allowNull: true
    }
},{
    tableName:'workspace'
});

Workspace.sync(
    {
        alter:true
    })
   .then(()=> console.log('Create Workspace table'))
   .catch((err)=> console.log(err))

export default Workspace
