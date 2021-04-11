const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();

const mongoUri = require('../mogodbCredentials').uri;

// Connect Mongoose
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});


// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
const { authenticate } = require('./middleware/auth');

//MODELS
const { User } = require('./models/user');

// ROUTES

// Register
app.post('/api/user', (request, response) => {
    const { email, password } = request.body;
    const user  = User({email, password});
    user.save((error, doc) => {
        if ( error ) { return response.status(400).json(error) }
        response.status(200).json(doc)
    })
});

// Login
app.post('/api/user/login', (request, response) => {
    // Find user by email
    User.findOne({email: request.body.email}, (error, user) => {
        if ( error ) { return response.json(error); }
        if ( !user ) { return response.status(404).json({message: "User not found."}); }
        // Compare pass with hash from db using userSchema.methods.comparePassword
        user.comparePassword( request.body.password, (error, isMatch) => {
            if ( error ) { return response.json(error); }
            if ( !isMatch ) {
                return response.status(400)
                    .json({message: 'Wrong password'});
            }
            // Generate token and set cookie
            user.generateToken( (error, user) => {
                 if ( error ) { return response.status(400).send(error); }
                 response.cookie('auth', user.token).send('ok');
            })
        });
    });
});

// Checking indicate user by token
app.get('/api/tokencheck', authenticate, (request, response) => {

    const { email, token }  = request;
    response.status(200).send({email, token});

    /* // Has been moved to Middleware
    const token = request.cookies.auth;
    User.findByToken(token, (error, user) => {
        if ( error ) { return response.status(400).send('Invalid token!'); }
        if ( !user ) { return response.status(401).send('Authentication failed.'); }
        response.status(200).send(user.email);
    });
    */
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express started on port ${port}`);
});