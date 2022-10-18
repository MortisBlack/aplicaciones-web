import Column  from '../../models/Column.js';
import Board from '../../models/Board.js';
import ColumnBO from '../../domain/Column.js';
import BoardRepository from './Board.repository.js';

const boardRepository = new BoardRepository();


export default class ColumnRepository {


    async create(column) {
        
        const columnBO = column.toPersistenceObject();
        const result = await Column.create(columnBO);

        const board = await boardRepository.findOne(result.BoardId);
        return new ColumnBO(result.id, result.title, board);
        
    }

    async update(column) {

        if(column.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await Column.update(column, {
            where: {
                id: column.id
            },
            include:Board
        });
        return this.findOne(column.id);
        
    }

    async delete(id) {
        
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
                model: Board,
                attributes:[
                    'id', 
                ],
                as: 'Board'
            }]
        });

        let column = await boardRepository.findOne(result.BoardId);
        return new ColumnBO(result.id, result.title, column);
        
    }

    async findAll() {
        
        const result = await Column.findAll({
            include:[{
                model: Board,
                as: 'Board'
            }]
        });
        return await result.map(async (element) => {
            let column = await boardRepository.findOne(element.dataValues.BoardId);
            return new ColumnBO(element.dataValues.id, element.dataValues.title, column);
        });
    }
}

