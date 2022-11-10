import { connection } from "../data/connection.js";
import {DATE,STRING,BIGINT} from "sequelize";
import bcrypt from 'bcryptjs';

const User = connection.define('User',{
    id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: STRING, 
        max:255, 
        allowNull: false,
        unique: true
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
        allowNull: true
    },
    phone: {
        type: STRING, 
        max:255, 
        allowNull: true
    },
    img_profile: {
        type: STRING, 
        max:255, 
        allowNull: true
    },
    birthdate: {
        type: DATE, 
        max:255, 
        allowNull: true
    }
},{
    tableName:'user'
});

// Hooks are automatic methods that run during various phases of the User Model lifecycle
User.beforeSave(async (user, options) => {
    if (user.password) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
});

User.prototype.comparePassword = (passw, cb) => {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

User.sync()
.then(()=> console.log('Create User table'))
.catch((err)=> console.log(err))

export default User