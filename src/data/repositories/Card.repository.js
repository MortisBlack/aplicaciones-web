import Card from '../../models/Card.js';
import Column from '../../models/Column.js';
import CardBO from '../../domain/Card.js';
import ColumnBO from '../../domain/Column.js';
import ColumnRepository from './Column.repository.js';
import {literal, Op} from 'sequelize';

const columnRepository = new ColumnRepository();

export default class CardRepository {

    async create(card) {
        const column = await columnRepository.findOne(card.column.id);
        
        const cardBO = card.toPersistenceObject();
        cardBO.position = await this.countByColumnId(card.column.id) + 1;
        const result = await Card.create(cardBO);
        return new CardBO(
            result.id, 
            result.title, 
            result.description, 
            result.deadline_date, 
            column,
            result.position
        );
    }

    async count() {
        return await Card.count();
    }

    async countByColumnId(columnId) {
        return await Card.count({
            where: {
                ColumnId: columnId
            }
        });
    }

    async update(card) {
        
        if(card.id == undefined){
            const error = new Error(`id is undefined`);
            error.status = 404;
            throw error;
        };

        await this.findOne(card.id);
        await columnRepository.findOne(card.column.id)
        
        const cardBO = card.toPersistenceObject()

        let max = await this.countByColumnId(card.column.id);
        
        if (card.column.id != cardCheck.column.id) {
           max = max + 1; 
        }

        if(cardBO.position > max) {
            return "column";
        }

        if (card.position > cardCheck.position) {
            await Card.update(
                { position: literal('position - 1') },
                {
                    where: {
                        ColumnId: card.column.id,
                        position: {
                            [Op.gt]: cardCheck.position,
                            [Op.lte]: card.position
                        }
                    }
                }
            );

        } else if (card.position < cardCheck.position) {
            await Card.update(
                { position: literal('position + 1') },
                {
                    where: {
                        ColumnId: card.column.id,
                        position: {
                            [Op.gte]: card.position,
                            [Op.lt]: cardCheck.position
                        }
                    }
                }
            );
        }

        await Card.update(cardBO, {
            where: {
                id: card.id
            },
            include:Column
        });

        return this.findOne(card.id);
    }

    async findByPositionAndColumn(position, columnId) {
        return await Card.findOne({
            where: {
                position: position,
                ColumnId: columnId
            }
        }).toJson();
    }

    async delete(id) {
        await this.findOne(id);

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
            const error = new Error(`The card ${id} doesn't exist`);
            error.status = 404;
            throw error;
        };
        
        let column = await columnRepository.findOne(result.ColumnId);
        
        return new CardBO(
            result.id, 
            result.title, 
            result.description, 
            result.deadline_date, 
            column,
            result.position,
            result.createdAt,
            result.updatedAt
        ).toJson();
    }

    async findAll() {  
        const result = await Card.findAll({
            include:[{
                model: Column,
                as: 'Column'
            }]
        });

        if(result == null || result.length == 0) {
            const error = new Error(`There are not cards registered yet`);
            error.status = 404;
            throw error;
        };

        return await Promise.all( result.map(async (element, index)=> {
            // let column = await columnRepository.findOne(element.dataValues.ColumnId);
            return new CardBO(
                element.dataValues.id,
                element.dataValues.title,
                element.dataValues.description,
                element.dataValues.deadline_date,
                new ColumnBO(element.dataValues.ColumnId),
                element.dataValues.position,
                element.dataValues.createdAt,
                element.dataValues.updatedAt
            ).toJson();
        }));
    }
}
