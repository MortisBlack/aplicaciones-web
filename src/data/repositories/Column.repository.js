import Column from '../../models/Column.js';
import Board from '../../models/Board.js';
import Card from '../../models/Card.js';
import ColumnBO from '../../domain/Column.js';
import CardBO from '../../domain/Card.js';
import BoardRepository from './Board.repository.js';

const boardRepository = new BoardRepository();

export default class ColumnRepository {

    async create(column) {
        const board = await boardRepository.findOne(column.board.id);

        if(board == undefined) {
            return undefined;
        }

        const columnBO = column.toPersistenceObject();
        const result = await Column.create(columnBO);
        return new ColumnBO(result.id, result.title, board);
    }

    async update(column) {
        
        if(column.id == undefined){
            throw new Error('id is undefined');
        };

        const columnCheck = await this.findOne(column.id);
        
        if(columnCheck == undefined) {
            return "column";
        };

        const boardCheck = await boardRepository.findOne(column.board.id)
        
        if(boardCheck == undefined ) {
            return "board";
        };
        
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
        const columnCheck = await this.findOne(id);

        if(columnCheck == undefined) {
            return undefined;
        }

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
            return undefined;
        };

        let board = await boardRepository.findOne(result.BoardId);

        return new ColumnBO(result.id, result.title, board);
    }

    async findAll() {  
        const result = await Column.findAll({
            include:[{
                model: Board,
                as: 'Board'
            }]
        });


        if(result == null || result.length == 0) {
            return undefined;
        };


        return await Promise.all( result.map(async (element, index)=> {
            let board = await boardRepository.findOne(element.dataValues.BoardId)
            return new ColumnBO(element.dataValues.id, element.dataValues.title, board);
        }));
    }

    async findAllCards(id) {
        const columnCheck = await this.findOne(id);

        if(columnCheck == undefined) {
            return Error('Column not found');
        }

        // find board with all cards
        const result = await Column.findOne({
            where: {
                id: id
            },
            include:[{
                model: Card,
                as: 'cards'
            }]
        });

        const cards = result.cards;

        // convert cards to CardBO
        return cards.map((card) => {
            return new CardBO(card.id, card.title, card.description, card.deadline_date, columnCheck);
        });
    }
}
