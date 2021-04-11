const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

const mongoUri = require('../mogodbCredentials').uri;

// Connect Mongoose
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});


// MIDDLEWARE
app.use(bodyParser.json());

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
                 response.cookie('x-auth', user.token).send('ok');
            })
        });
    });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express started on port ${port}`);
});