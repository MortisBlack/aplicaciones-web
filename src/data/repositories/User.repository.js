import User from '../../models/User.js';
import UserBO from '../../domain/User.js';

export default class UserRepository {

    async create(user) {
        const userBO = user.toPersistenceObject();
        // console.log("userBO", userBO)
        const result = await User.create(userBO);
        const newUser = new UserBO(
            result.id,
            result.password, 
            result.name, 
            result.first_surname,
            result.second_surname,
            result.email,
            result.phone,
            result.img_profile,
            result.birthdate
        );
        return newUser; 
    }

    async update(user) {

        if(user.id === undefined){
            const error = new Error(`id is undefined`);
            error.status = 404;
            throw error;
        }

        await this.findOne(user.id);

        const userBO = user.toPersistenceObject();
        const result = await User.update(userBO, {
            where: {
                id: user.id
            }
        });

        return this.findOne(user.id);
    };

    async delete(id) {
        await this.findOne(id);

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

        if(result == null) {
            const error = new Error(`The user ${id} doesn't exist`);
            error.status = 404;
            throw error;
        };

        return new UserBO(
            result.dataValues.id,  
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

    async findOneByEmail(email) {
        
        const result = await User.findOne({
            where: {
                email: email
            }
        });

        if(result == null) {
            return undefined;
        };

        return new UserBO(
            result.dataValues.id,  
            result.dataValues.password, 
            result.dataValues.name, 
            result.dataValues.first_surname, 
            result.dataValues.second_surname, 
            result.dataValues.email, 
            result.dataValues.phone, 
            result.dataValues.img_profile, 
            result.dataValues.birthdate
        );
    };
                

    async findAll() {
        const result = await User.findAll();

        if(result == null || result.length == 0) {
            const error = new Error(`There are not user registered yet`);
            error.status = 404;
            throw error;
        };

        return result.map((element, index)=> {
            const newUser = new UserBO(
                element.dataValues.id, 
                element.dataValues.password,
                element.dataValues.name,
                element.dataValues.first_surname,
                element.dataValues.second_surname,
                element.dataValues.email,
                element.dataValues.phone,
                element.dataValues.img_profile,
                element.dataValues.birthdate
            );
            return newUser;
        });
    }
}

