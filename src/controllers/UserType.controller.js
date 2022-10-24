import UserTypeRepository from "../data/repositories/UserType.repository.js";
import UserTypeBO from '../domain/UserType.js';

const userTypeRepository = new UserTypeRepository();

export default class UserTypeController { 
    async createUserType(req, res, next) {
        try {
            const {
                user_type
            } = req.body;
            
            const userType = new UserTypeBO(
                undefined,
                user_type
                );
            
            let result = await userTypeRepository.create(userType);
    
            res.status(200).send({
                message: "User type created successfully",
                result: result
            });
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    };

    async updateUserType(req, res, next){    
        try {
            const {
                user_type
            } = req.body;

            const {id} = req.params;

            const userType = new UserTypeBO(
                    id,
                    user_type
                    );

            let result = await userTypeRepository.update(userType);
            
            if(result) {
                res.status(200).send({
                    message: "User type updated successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The user type ${id} doesn't exist`
                });
            }

        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }   
    };

    async deleteUserType(req, res, next){
        try {
            const {id} = req.params;

            let result = await userTypeRepository.delete(id);

            if(result) {
                res.status(200).send({
                    message: "User type deleted successfully"
                });
            } else {
                res.status(404).send({
                    message: `The user type ${id} doesn't exist`
                });
            }

        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async getAllUserTypes(req, res, next){
        try {
            let result = await userTypeRepository.findAll();

            if(result) {
                res.status(200).send({
                    message: "User types fetched successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `There are not user types registered yet`
                });
            }
            
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async findOneUserType(req, res, next){
        try {
            const {id} = req.params;

            let result = await userTypeRepository.findOne(id);

            if(result) {
                res.status(200).send({
                    message: "User type fetched successfully",
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The user type ${id} doesn't exist`
                });
            }
            
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }
}

