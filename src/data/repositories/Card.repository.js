import Card  from '../../models/Card.js';
import Column from '../../models/Column.js';

import CardBO from '../../domain/Card.js';

import ColumnRepository from './Column.repository.js';

const columnRepository = new ColumnRepository();

export default class CardRepository {


    async create(card) {
        
        const cardBO = card.toPersistenceObject();
        const result = await Card.create(cardBO);
        return new CardBO(result.id, result.title, result.description, result.board);
        
    }

    async update(card) {

        if(card.id === undefined){
            throw new Error('id is undefined');
        }

        const cardBO = card.toPersistenceObject()
        await Card.update(cardBO, {
            where: {
                id: card.id
            },
            include:Column
        });
        return this.findOne(card.id);
        
    }

    async delete(id) {
        
        const result = await Card.destroy({
            where: {
                id: id
            }
        });
        return "Card successfully deleted";
        
    }

    async findOne(id) {
        
        const result = await Card.findOne({
            where: {
                id: id
            },
            include:[{
                model: Column, attributes:
                    ['id'],
                as: 'Column'
            }]
        });

        let column = await columnRepository.findOne(result.ColumnId);

        return new CardBO(result.id, result.title, result.description, result.deadlineDate, column);
        
    }

    async findAll() {
        
        const result = await Card.findAll({
            include:[{
                model: Column, 
                as: 'Column'
            }]
        });
        return await result.map(async (element, index) => {
            let column = await columnRepository.findOne(element.dataValues.ColumnId);
            return new CardBO(element.dataValues.id, element.dataValues.title, element.dataValues.description, element.dataValues.deadlineDate, column);
        });
        
    }
}

