import {UserType} from '../models/UserType.js';

class UserTypeRepository {


    async create(userType) {
        
        const result = await UserType.create(userType);
        await result.reload();
        return result;
    }

    async update(userType) {

        if(userType.id === undefined){
            throw new Error('id is undefined');
        }

        
        const result = await UserType.update(userType, {
            where: {
                id: userType.id
            }
        });
        return result;
    }

    async delete(id) {
        
        const result = await UserType.destroy({
            where: {
                id: id
            }
        });
        return result;
    }

    async findOne(id) {
        
        const result = await UserType.findOne({
            where: {
                id: id
            }
        });
        return result;
    }

    async findAll() {
        
        const result = await UserType.findAll();
        return result;
    }
}

export { UserTypeRepository };