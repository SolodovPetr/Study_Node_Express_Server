const jwt = require('jsonwebtoken');

const userId = 100;
const secret = 'superSecretServerPassword';

// Synchronous Sign with default (HMAC SHA256)
const token = jwt.sign(userId, secret);
console.log(token);

// Verify a token symmetric
jwt.verify(token, secret+2, (error, decoded) => {
    if (error) { console.log(error) }
    console.log( decoded )
});