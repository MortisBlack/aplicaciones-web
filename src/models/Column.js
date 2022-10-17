import { connection } from "../data/connection.js";
import { STRING, BIGINT } from "sequelize";
import Board from "./Board.js";

export const Column = connection.define("Column",
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
    },
    {
        tableName: "column"
    });

Board.hasMany(Column, { as: "columns" });
Column.hasOne(Board, { as: "board" });

Column.sync()
    .then(() => console.log("Create Column table"))
    .catch((err) => console.log(err));

export default Column;
