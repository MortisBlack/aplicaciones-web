import UserType from '../../models/UserType.js';
import UserTypeBO from '../../domain/UserType.js';

export default class UserTypeRepository {

    async create(userType) {
        const userTypeBO = userType.toPersistenceObject();
        const result = await UserType.create(userTypeBO);
        return new UserTypeBO(
            result.id,
            result.user_type
            );
    }

    async update(userType) {

        if(userType.id === undefined){
            const error = new Error(`id is undefined`);
            error.status = 404;
            throw error;
        }

        await this.findOne(userType.id);

        const userTypeBO = userType.toPersistenceObject();
        const result = await UserType.update(userTypeBO, {
            where: {
                id: userType.id
            }
        });

        return this.findOne(userType.id);
    };

    async delete(id) {
        await this.findOne(id);

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

        if(result == null) {
            const error = new Error(`The user type ${id} doesn't exist`);
            error.status = 404;
            throw error;
        };

        return new UserTypeBO(
            result.dataValues.id, 
            result.dataValues.user_type
        );
    };
                

    async findAll() {
        const result = await UserType.findAll();

        if(result == null || result.length == 0) {
            const error = new Error(`There are not user types registered yet`);
            error.status = 404;
            throw error;
        };

        return result.map((element, index)=> {
            return new UserTypeBO(
                element.dataValues.id, 
                element.dataValues.user_type
            )
        });
    }
}