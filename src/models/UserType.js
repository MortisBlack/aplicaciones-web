import { connection } from "../data/connection.js";
import {STRING,BIGINT} from "sequelize";

const UserType = connection.define('UserType',{
    id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    user_type: {
        type: STRING, 
        max:500, 
        allowNull: false
    }
},{
    tableName:'user_type'
});

UserType.sync({
    alter:true
})
.then(()=> console.log('Create UserType table'))
.catch((err)=> console.log(err))

export default UserType