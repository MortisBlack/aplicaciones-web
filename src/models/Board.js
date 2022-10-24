import { connection } from "../data/connection.js";
import {STRING,BIGINT} from "sequelize";
import Workspace from "./Workspace.js";

const Board = connection.define('Board',{
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
        type:STRING,
        allowNull:true,
        max:500
    },
    WorkspaceId: {
        type: BIGINT,
        allowNull: false
    }
},{
    tableName:'board'
});

Workspace.hasMany(Board, {
    as: 'boards'
});
Board.belongsTo(Workspace, {
    as: 'Workspace'
});

Board.sync({
    alter:true
})
.then(()=> console.log('Create Board table'))
.catch((err)=> console.log(err))

export default Board