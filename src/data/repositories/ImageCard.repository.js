import ImageCard from '../../models/ImageCard.js';

export default class imageCardRepository {


    async create(imageCard) {
        
        const result = await ImageCard.create(imageCard);
        await result.reload();
        return result;
        
    }

    async update(imageCard) {

        if(imageCard.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await ImageCard.update(imageCard, {
            where: {
                id: imageCard.id
            }
        });
        return result;
        
    }

    async delete(id) {
        
        const result = await ImageCard.destroy({
            where: {
                id: id
            }
        });
        return result;
        
    }

    async findOne(id) {
        
        const result = await ImageCard.findOne({
            where: {
                id: id
            }
        });
        return result;
        
    }

    async findAll() {
        
        const result = await ImageCard.findAll();
        return result;
        
    }
}

