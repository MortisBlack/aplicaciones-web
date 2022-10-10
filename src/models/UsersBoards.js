import {connection } from "../data/connection.js";
import {BIGINT} from "sequelize";
import User from "./User.js";
import Board from "./Board.js";

const UsersBoards = connection.define(
    'UsersBoards', {
        id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true,
    }
    },{
        tableName:'users_boards'
    });

User.belongsToMany(Board, {through: UsersBoards });
Board.belongsToMany(User,{through: UsersBoards});

UsersBoards.sync()
    .then(()=> console.log('Create relation table between Users and Boards'))
    .catch((err)=> console.log(err))

export default UsersBoards;