import passport from 'passport';
import {Strategy} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import User from '../models/User.js';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: 'nodeauthsecret',
};

passport.use('jwt', new Strategy(opts, function(jwt_payload, done) {
    User
    .findByPk(jwt_payload.id)
    .then((user) => { return done(null, user); })
    .catch((error) => { return done(error, false); });
}));

export default passport.authenticate('jwt', {
    session: false
});