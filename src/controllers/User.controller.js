import UserRepository from "../data/repositories/User.repository.js";
export default class UserController { 
    createUser(req, res, next) {
        res.send("Hello world");
    }

    noCreate(req, res, next) {
        res.send("I hate world");
    }
}

