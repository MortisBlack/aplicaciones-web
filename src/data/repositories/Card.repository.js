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
            }
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
            }
        });
        return new CardBO(result.id, result.title, result.description, result.deadlineDate, result.column);
        
    }

    async findAll() {
        
        const result = await Card.findAll();
        return result;
        
    }
}

