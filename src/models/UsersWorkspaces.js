import { connection } from "../data/connection.js";
import { BIGINT } from "sequelize";
import User from "./User.js";
import UserType from "./UserType.js";
import Workspace from "./Workspace.js";

const UsersWorkspaces = connection.define(
    'UsersWorkspaces', {
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
        WorkspaceId: {
            type: BIGINT,
            references: "Workspace",
            referencesKey: "id",
            allowNull: false
        },
    },{
        tableName:'users_workspaces'
    });

User.belongsToMany(Workspace, {
    through: UsersWorkspaces,
    foreignKey: 'UserId' 
});
Workspace.belongsToMany(User,{
    through: UsersWorkspaces,
    foreignKey: 'WorkspaceId'
});

User.belongsToMany(UserType, {through: UsersWorkspaces });
UserType.belongsToMany(User, {through: UsersWorkspaces });

UsersWorkspaces.sync({
    alter:true
})
    .then(()=> console.log('Create relation table between Users and Workspaces'))
    .catch((err)=> console.log(err))

export default UsersWorkspaces;