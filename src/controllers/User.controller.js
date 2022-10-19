import UserRepository from "../data/repositories/User.repository.js";
import User from "../models/User.js";
import UserBO from '../domain/User.js';

const userRepository = new UserRepository();

export default class UserController { 
    createUser(req, res, next) {
        res.send("Hello world");
    }

    noCreate(req, res, next) {
        res.send("I hate world");
    };

    postStudent(req, res, next){
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
                req.body.username, 
                req.body.password,
                req.body.name, 
                req.body.first_surname,
                req.body.second_surname,
                req.body.email,
                req.body.phone,
                req.body.img_profile,
                req.body.birthdate
                );
            userRepository.create(user)

            res.status(200).send({
                message: "User created successfully"
            });

            // console.log(user);
            // userRepository.create(user);
    
            // console.log(user)
        } catch (error) {
            console.warn(error);
        }    
    };
}

