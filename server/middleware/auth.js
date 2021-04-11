const { User } = require('../models/user');

const authenticate = (request, response, next) => {
    const token = request.cookies.auth;
    User.findByToken(token, (error, user) => {
        if ( error ) { return response.status(400).send('Invalid token!'); }
        if ( !user ) { return response.status(401).send('Authentication failed.'); }
        request.email = user.email;
        request.token = user.token;
        next();
    });
}

module.exports = { authenticate }