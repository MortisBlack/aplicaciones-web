import UserBO from '../domain/User.js';
import UserRepository from '../data/repositories/User.repository.js';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository();

export default class AuthController {

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            
            const user = await userRepository.findOneByEmail(email);
            if (!user) {
                return res.status(401).send({
                    message: "User not found"
                });
            }

            user.comparePassword(password, (err, isMatch) => {
                
                if (isMatch && !err) {
                    let token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {
                        expiresIn: 86400 * 30
                    });
                    jwt.verify(token, 'nodeauthsecret', (err, data) => {
                        console.log(err, data);
                    })
                    res.json({
                        success: true,
                        token: 'JWT ' + token
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            })

            
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }
}
