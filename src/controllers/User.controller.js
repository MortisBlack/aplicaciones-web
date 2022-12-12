import UserRepository from "../data/repositories/User.repository.js";
import UserBO from '../domain/User.js';
import fs from 'fs'

const userRepository = new UserRepository();

export default class UserController { 
    async createUser(req, res, next) {
        console.log("req", req)
        console.log("req.body", JSON.stringify(req.body))
        console.log("req.params", req.params)
        try {
            const {
                password,
                name,
                first_surname,
                second_surname,
                email,
                phone,
                birthdate
            } = req.body;
            console.log(req.body);
            
            const user = new UserBO(
                undefined, 
                password,
                name, 
                first_surname,
                second_surname,
                email,
                phone,
                undefined,
                birthdate
            );
            

            console.log("user", user)
            let userExists = await userRepository.findOneByEmail(email);

            if(userExists) {
                return res.status(409).send({
                    message: "Email already exists"
                });
            }

            if(req.file) {
                console.log("req.file", req.filename)
                user.img_profile = req.file.filename;
            }
            
            let result = await userRepository.create(user);
    
            res.status(200).send({
                message: "User created successfully",
                result: result
            });
        } catch (err) {
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
            
            res.status(200).send({
                message: "User updated successfully", 
                result: result
            });
        } catch (err) {
            next(err)
        }   
    };

    async deleteUser(req, res, next){
        try {
            const {id} = req.params;

            let result = await userRepository.delete(id);

            res.status(200).send({
                message: "User deleted successfully"
            });
        } catch (err) {
            next(err)
        }
    }

    async getAllUsers(req, res, next){
        try {
            let result = await userRepository.findAll();
            
            res.status(200).send({
                message: "Users fetched successfully", 
                result: result
            });           
        } catch (err) {
            next(err)
        }
    }

    async findOneUser(req, res, next){
        try {
            const {id} = req.params;

            let result = await userRepository.findOne(id);

            res.status(200).send({
                message: "User fetched successfully",
                result: result
            });        
        } catch (err) {
            next(err)
        }
    }
}

