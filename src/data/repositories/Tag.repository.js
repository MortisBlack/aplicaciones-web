import ImageCard from '../../models/imageCard.js';

export default class imageCardRepository {


    async create(imageCard) {
        
        const result = await imageCard.create(imageCard);
        await result.reload();
        return result;
        
    }

    async update(imageCard) {

        if(imageCard.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await imageCard.update(imageCard, {
            where: {
                id: imageCard.id
            }
        });
        return result;
        
    }

    async delete(id) {
        
        const result = await imageCard.destroy({
            where: {
                id: id
            }
        });
        return result;
        
    }

    async findOne(id) {
        
        const result = await imageCard.findOne({
            where: {
                id: id
            }
        });
        return result;
        
    }

    async findAll() {
        
        const result = await imageCard.findAll();
        return result;
        
    }
}

