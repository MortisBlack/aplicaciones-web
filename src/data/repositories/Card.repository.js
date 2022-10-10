import { Card } from '../models/Card.js';

class CardRepository {


    async create(card) {
        
        const result = await Card.create(card);
        await result.reload();
        return result;
        
    }

    async update(card) {

        if(card.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await Card.update(card, {
            where: {
                id: card.id
            }
        });
        return result;
        
    }

    async delete(id) {
        
        const result = await Card.destroy({
            where: {
                id: id
            }
        });
        return result;
        
    }

    async findOne(id) {
        
        const result = await Card.findOne({
            where: {
                id: id
            }
        });
        return result;
        
    }

    async findAll() {
        
        const result = await Card.findAll();
        return result;
        
    }
}

export { CardRepository };