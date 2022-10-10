import {UsersCards} from '../models/UsersCards.js';

class UsersCardsRepository {


    async create(userCard) {
        
        const result = await UsersCards.create(userCard);
        await result.reload();
        return result;
    }

    async update(userCard) {

        if(userCard.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await UsersCards.update(userCard, {
            where: {
                id: userCard.id
            }
        });
        return result;
    }

    async delete(id) {
        
        const result = await UsersCards.destroy({
            where: {
                id: id
            }
        });
        return result;
    }

    async findOne(id) {
        
        const result = await UsersCards.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async findAll() {
        
        const result = await UsersCards.findAll();
        return result;
    }
}

export { UsersCardsRepository };