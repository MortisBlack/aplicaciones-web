import {TagsCards} from '../models/TagsCards.js';

class TagsCardsRepository {


    async create(tagCard) {
        
        const result = await TagsCards.create(tagCard);
        await result.reload();
        return result;
    }

    async update(tagCard) {

        if(tagCard.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await TagsCards.update(tagCard, {
            where: {
                id: tagCard.id
            }
        });
        return result;
    }

    async delete(id) {
        
        const result = await TagsCards.destroy({
            where: {
                id: id
            }
        });
        return result;
    }

    async findOne(id) {
        
        const result = await TagsCards.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async findAll() {
        
        const result = await TagsCards.findAll();
        return result;
    }
}

export { TagsCardsRepository };