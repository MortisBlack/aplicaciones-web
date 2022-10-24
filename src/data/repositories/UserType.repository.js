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
            throw new Error('id is undefined');
        }

        const userTypeCheck = await this.findOne(userType.id);

        if(userTypeCheck == undefined) {
            return undefined;
        }

        const userTypeBO = userType.toPersistenceObject();

        const result = await UserType.update(userTypeBO, {
            where: {
                id: userType.id
            }
        });

        return this.findOne(userType.id);
    };

    async delete(id) {
        const userTypeCheck = await this.findOne(id);

        if(userTypeCheck == undefined) {
            return undefined;
        }

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
            return undefined;
        };

        return new UserTypeBO(
            result.dataValues.id, 
            result.dataValues.user_type
        );
    };
                

    async findAll() {
        const result = await UserType.findAll();

        if(result == null || result.length == 0) {
            return undefined;
        };

        return result.map((element, index)=> {
            return new UserTypeBO(
                element.dataValues.id, 
                element.dataValues.user_type
            )
        });
    }
}