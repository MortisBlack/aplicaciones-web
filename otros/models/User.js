import { connection } from "../data/connection.js";
import {DATE,STRING,BIGINT} from "sequelize";

const User = connection.define('User',{
    id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: STRING, 
        max:255, 
        allowNull: false
    },
    password: {
        type: STRING, 
        max:255, 
        allowNull: false
    },
    name: {
        type: STRING, 
        max:255, 
        allowNull: false
    },
    first_surname: {
        type: STRING, 
        max:255, 
        allowNull: false
    },
    second_surname: {
        type: STRING, 
        max:255, 
        allowNull: false
    },
    email: {
        type: STRING, 
        max:255, 
        allowNull: false
    },
    phone: {
        type: STRING, 
        max:255, 
        allowNull: false
    },
    img_profile: {
        type: STRING, 
        max:255, 
        allowNull: false
    },
    birthdate: {
        type: DATE, 
        max:255, 
        allowNull: false
    }
},{
    tableName:'user'
});

User.sync()
.then(()=> console.log('Create User table'))
.catch((err)=> console.log(err))

export default User