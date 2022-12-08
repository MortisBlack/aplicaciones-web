import ImageCard from '../../models/ImageCard.js';
import Card from '../../models/Card.js';
import ImageCardBO from '../../domain/ImageCard.js';
import CardRepository from './Card.repository.js';

const cardRepository = new CardRepository();

export default class ImageCardRepository {

    async create(imageCard) {
        const card = await cardRepository.findOne(imageCard.card.id);

        const imageCardBO = imageCard.toPersistenceObject();
        const result = await ImageCard.create(imageCardBO);
        return new ImageCardBO(
            result.id, 
            result.image,
            card
        );
    }

    async update(imageCard) {
        
        if(imageCard.id == undefined){
            const error = new Error(`id is undefined`);
            error.status = 404;
            throw error;
        };

        await this.findOne(imageCard.id);
        await cardCheck.findOne(imageCard.card.id)
        
        const imageCardBO = imageCard.toPersistenceObject()

        await ImageCard.update(imageCardBO, {
            where: {
                id: imageCard.id
            },
            include:Card
        });

        return this.findOne(imageCard.id);
    }

    async delete(id) {
        await this.findOne(id);

        const result = await ImageCard.destroy({
            where: {
                id: id
            }
        });
        return "Image card successfully deleted";
    }

    async findOne(id) {
        
        const result = await ImageCard.findOne({
            where: {
                id: id
            },
            include:[{
                model: Card, attributes:
                    ['id', 'title', 'description', 'deadline_date', 'ColumnId'],
                as: 'card'
            }]
        
        });
        
        if(result == null) {
            const error = new Error(`The image card ${id} doesn't exist`);
            error.status = 404;
            throw error;
        };

        let card = await cardRepository.findOne(result.CardId);

        return new ImageCardBO(
            result.id, 
            result.title, 
            card
        );
    }

    async findAll() {  
        
        const result = await ImageCard.findAll({
            include:[{
                model: Card,
                as: 'card'
            }]
        });


        if(result == null || result.length == 0) {
            const error = new Error(`There are not images cards registered yet`);
            error.status = 404;
            throw error;
        };


        return await Promise.all( result.map(async (element, index)=> {
            let card = await cardRepository.findOne(element.dataValues.CardId)
            return new ImageCardBO(
                element.dataValues.id,
                element.dataValues.image,
                card
            );
        }));
    }
}
