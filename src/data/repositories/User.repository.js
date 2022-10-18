import User from '../../models/User.js';

export default class UserRepository {


    async create(user) {
        
        const result = await User.create(user);
        await result.reload();
        return result;
    }

    async update(user) {

        if(user.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await User.update(user, {
            where: {
                id: user.id
            }
        });
        return result;
    }

    async delete(id) {
        
        const result = await User.destroy({
            where: {
                id: id
            }
        });
        return result;
    }

    async findOne(id) {
        
        const result = await User.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async findAll() {
        
        const result = await User.findAll();
        return result;
    }
}

