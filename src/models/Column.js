import { connection } from "../data/connection.js";
import { STRING, BIGINT, INTEGER } from "sequelize";
import Board from "./Board.js";

const Column = connection.define("Column",
    {
        id:{
            type: BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: STRING,
            max: 255,
            allowNull: false,
        },
        position:{
            type: INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        BoardId: {
            type: BIGINT,
            allowNull: false
        }
    },
    {
        tableName: "column"
    });

Board.hasMany(Column, { 
    as: "columns" 
});
Column.belongsTo(Board, { 
    as: "Board",
});

Column.sync({
    alter:true
})
    .then(() => console.log("Create Column table"))
    .catch((err) => console.log(err));

export default Column;
