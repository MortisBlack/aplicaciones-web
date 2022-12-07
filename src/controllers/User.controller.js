import UserRepository from "../data/repositories/User.repository.js";
import UserBO from '../domain/User.js';

const userRepository = new UserRepository();

export default class UserController { 
    async createUser(req, res, next) {
        try {
            const {
                password,
                name,
                first_surname,
                second_surname,
                email,
                phone,
                img_profile,
                birthdate
            } = req.body;

            
            const user = new UserBO(
                undefined, 
                password,
                name, 
                first_surname,
                second_surname,
                email,
                phone,
                img_profile,
                birthdate
                );

            
            let userExists = await userRepository.findOneByEmail(email);

            if(userExists) {
                return res.status(409).send({
                    message: "Email already exists"
                });
            }
            
            let result = await userRepository.create(user);
    
            res.status(200).send({
                message: "User created successfully",
                result: result
            });
        } catch (err) {
            // res.send({
            //     message: err.message
            // })
            next({
                message: err.message, 
                status: 400,
                errors: err.errors
            })
        }
    };

    async updateUser(req, res, next){    
        try {
            const {
                username,
                password,
                name,
                first_surname,
                second_surname,
                email,
                phone,
                img_profile,
                birthdate
            } = req.body;

            const {id} = req.params;

            const user = new UserBO(
                    id,
                    username, 
                    password,
                    name, 
                    first_surname,
                    second_surname,
                    email,
                    phone,
                    img_profile,
                    birthdate
                    );

            let result = await userRepository.update(user);
            
            if(result) {
                res.status(200).send({
                    message: "User updated successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The user ${id} doesn't exist`
                });
            }

        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }   
    };

    async deleteUser(req, res, next){
        try {
            const {id} = req.params;

            let result = await userRepository.delete(id);

            if(result) {
                res.status(200).send({
                    message: "User deleted successfully"
                });
            } else {
                res.status(404).send({
                    message: `The user ${id} doesn't exist`
                });
            }

        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async getAllUsers(req, res, next){
        try {
            let result = await userRepository.findAll();
            

            if(result) {
                res.status(200).send({
                    message: "Users fetched successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `There are not users registered yet`
                });
            }
            
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async findOneUser(req, res, next){
        try {
            const {id} = req.params;

            let result = await userRepository.findOne(id);

            if(result) {
                res.status(200).send({
                    message: "User fetched successfully",
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The user ${id} doesn't exist`
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

