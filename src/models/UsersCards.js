import {connection} from "../data/connection.js";
import {BIGINT} from "sequelize";
import User from "./User.js";
import Card from "./Card.js";

const UsersCards = connection.define('UsersCards', {
    id:{
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true
    }
    },{
        tableName:'users_cards'
    });

User.belongsToMany(Card, {through: UsersCards });
Card.belongsToMany(User,{through: UsersCards });

UsersCards.sync()
    .then(()=> console.log('Create relation table between Users and Cards'))
    .catch((err)=> console.log(err))

export default UsersCards;