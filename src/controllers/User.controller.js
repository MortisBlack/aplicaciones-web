import UserRepository from "../data/repositories/User.repository.js";
import User from "../models/User.js";
import UserBO from '../domain/User.js';

const userRepository = new UserRepository();

export default class UserController { 
    async createUser(req, res, next) {
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
    
            const user = new UserBO(
                undefined,
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
            
            let result = await userRepository.create(user);
    
            res.status(200).send({
                message: "User created successfully",
                result: result
            });
        } catch (err) {
            err.message = 'Error creating user'
            next(err)
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
    
            res.status(200).send({
                message: "User updated successfully", 
                result: result
            });
        } catch (err) {
            err.message = 'Error updating user'
            next(err)
        }
             
    };
}

