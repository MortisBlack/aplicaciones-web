import User from '../../models/User.js';
import UserBO from '../../domain/User.js';

export default class UserRepository {

    async create(user) {
        const userBO = user.toPersistenceObject();
        const result = await User.create(userBO);
        return new UserBO(
            result.id,
            result.username,
            result.password, 
            result.name, 
            result.first_surname,
            result.second_surname,
            result.email,
            result.phone,
            result.img_profile,
            result.birthdate
            );
    }

    async update(user) {

        if(user.id === undefined){
            throw new Error('id is undefined');
        }

        const userBO = user.toPersistenceObject();
        const result = await User.update(userBO, {
            where: {
                id: user.id
            }
        });
        return this.findOne(user.id);
    };

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
        return new UserBO(
            result.dataValues.id, 
            result.dataValues.username, 
            result.dataValues.password, 
            result.dataValues.name, 
            result.dataValues.first_surname, 
            result.dataValues.second_surname, 
            result.dataValues.email, 
            result.dataValues.phone, 
            result.dataValues.email, 
            result.dataValues.img_profile, 
            result.dataValues.birthdate
            );
    };
                

    async findAll() {
        
        const result = await User.findAll();
        return result;
    }
}

