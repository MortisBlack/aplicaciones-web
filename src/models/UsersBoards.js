import {connection } from "../data/connection.js";
import {BIGINT} from "sequelize";
import User from "./User.js";
import Board from "./Board.js";

const UsersBoards = connection.define(
    'UsersBoards', {
        id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true
        },
        UserId: {
            type: BIGINT,
            references: "User",
            referencesKey: "id",
            allowNull: false
        },
    },{
        tableName:'users_boards'
    });

User.belongsToMany(Board, {
    through: UsersBoards,
    foreignKey: 'UserId' 
});
Board.belongsToMany(User,{
    through: UsersBoards,
    foreignKey: 'WorkspaceId'
});

User.belongsToMany(Board, {through: UsersBoards });
Board.belongsToMany(User,{through: UsersBoards});

UsersBoards.sync({
    alter:true
})
    .then(()=> console.log('Create relation table between Users and Boards'))
    .catch((err)=> console.log(err))

export default UsersBoards;