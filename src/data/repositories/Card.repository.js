import Card from '../../models/Card.js';
import Column from '../../models/Column.js';
import CardBO from '../../domain/Card.js';
import ColumnRepository from './Column.repository.js';

const columnRepository = new ColumnRepository();

export default class CardRepository {

    async create(card) {
        const column = await columnRepository.findOne(card.column.id);

        if(column == undefined) {
            return undefined;
        }

        const cardBO = card.toPersistenceObject();
        const result = await Card.create(cardBO);
        return new CardBO(
            result.id, 
            result.title, 
            result.description, 
            result.deadline_date, 
            column
        );
    }

    async update(card) {
        
        if(card.id == undefined){
            throw new Error('id is undefined');
        };

        const cardCheck = await this.findOne(card.id);
        
        if(cardCheck == undefined) {
            return "card";
        };

        const columnCheck = await columnRepository.findOne(card.column.id)
        
        if(columnCheck == undefined ) {
            return "column";
        };
        
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
        const cardCheck = await this.findOne(id);

        if(cardCheck == undefined) {
            return undefined;
        }

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
                    ['id', 'title', 'BoardId'],
                as: 'Column'
            }]
        
        });

        if(result == null) {
            return undefined;
        };
        
        let column = await columnRepository.findOne(result.ColumnId);
        
        return new CardBO(
            result.id, 
            result.title, 
            result.description, 
            result.deadline_date, 
            column,
            result.createdAt,
            result.updatedAt
        );
    }

    async findAll() {  
        const result = await Card.findAll({
            include:[{
                model: Column,
                as: 'Column'
            }]
        });


        if(result == null || result.length == 0) {
            return undefined;
        };


        return await Promise.all( result.map(async (element, index)=> {
            let column = await columnRepository.findOne(element.dataValues.ColumnId)
            return new CardBO(
                element.dataValues.id,
                element.dataValues.title,
                element.dataValues.description,
                element.dataValues.deadline_date,
                column,
                element.dataValues.createdAt,
                element.dataValues.updatedAt
            );
        }));
    }
}
