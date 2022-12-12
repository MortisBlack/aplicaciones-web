import Column from '../../models/Column.js';
import Board from '../../models/Board.js';
import Card from '../../models/Card.js';
import ColumnBO from '../../domain/Column.js';
import CardBO from '../../domain/Card.js';
import BoardBO from '../../domain/Board.js';
import BoardRepository from './Board.repository.js';
import {literal, Op} from 'sequelize';

const boardRepository = new BoardRepository();

export default class ColumnRepository {

    async create(column) {
        const lastPosition = await this.countByBoardPosition(column.board.id);
        const board = await boardRepository.findOne(column.board.id);

        const columnBO = column.toPersistenceObject();
        columnBO.position = lastPosition + 1;
        const result = await Column.create(columnBO);
        return new ColumnBO(
            result.id,
            result.title, 
            result.position,
            board
            ).toJson();
    }

    async countByBoardPosition(boardId) {
        const result = await Column.count({
            where: {
                BoardId: boardId,
            }
        });
        return result;
    }

    async update(column) {
        
        if(column.id == undefined){
            const error = new Error(`id is undefined`);
            error.status = 404;
            throw error;
        };
        const columnDB = await this.findOne(column.id);
        
        if (column.position && column.position != columnDB.position){
            // update position of all columns in the same board
            await Column.update(
                {
                    position: literal('position - 1')
                },
                {
                    where: {
                        position: {
                            [Op.gt]: columnDB.position
                        },
                        BoardId: columnDB.board.id
                    }
                }
            ); 
        }


        //await boardRepository.findOne(column.board.id)

        const columnBO = column.toPersistenceObject()

        await Column.update(columnBO, {
            where: {
                id: column.id
            },
            include:Board
        });

        return this.findOne(column.id);
    }

    async delete(id) {
        await this.findOne(id);

        const result = await Column.destroy({
            where: {
                id: id
            }
        });
        return "Column successfully deleted";
    }

    async findOne(id) {

        const result = await Column.findOne({
            where: {
                id: id
            },
            include:[{
                model: Board, attributes:
                    ['id', 'title', 'description','WorkspaceId'],
                as: 'Board'
            }]
        
        });

        if(result == null) {
            const error = new Error(`The column ${id} doesn't exist`);
            error.status = 404;
            throw error;
        };
        let board = await boardRepository.findOne(result.BoardId);

        return new ColumnBO(result.id, result.title, result.position, board).toJson();
    }

    async findAll() {  
        const result = await Column.findAll({
            include:[{
                model: Board,
                as: 'Board'
            },{
                model: Card,
                as: 'cards'
            }]
        });


        if(result == null || result.length == 0) {
            const error = new Error(`There are not columns registered yet`);
            error.status = 404;
            throw error;
        };


        return await Promise.all( result.map(async (element, index)=> {
            let board = await boardRepository.findOne(element.dataValues.BoardId);
            return new ColumnBO(element.dataValues.id, element.dataValues.title, element.dataValues.title, board);
        }));
    }

    async findAllCards(id) {
        await this.findOne(id);

        // find board with all cards
        const result = await Column.findOne({
            where: {
                id: id
            },
            include:[{
                model: Card,
                as: 'cards'
            }],
            order: [
                ['cards', 'position', 'ASC']
            ]
        });

        const cards = result.cards;

        if(cards == null || cards.length == 0) {
            const error = new Error(`There are not cards registered yet`);
            error.status = 404;
            throw error;
        };
        
        // convert cards to CardBO
        return cards.map((card) => {
            return new CardBO(card.id, card.title, card.description, card.deadline_date, new BoardBO(id), card.position, card.createdAt, card.updatedAt).toJson();
        });
    }
}
