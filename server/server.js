const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const mongoUri = require('../mogodbCredentials').uri;

// Connect Mongoose
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});


// MIDDLEWARE
app.use(bodyParser.json());

//MODELS
const { User } = require('./models/user');


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express started on port ${port}`);
});