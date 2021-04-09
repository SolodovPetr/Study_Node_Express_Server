const express = require('express');
const app = express();
const mongoose = require('mongoose');

const mongoUri = require('./mogodbCredentials').uri;

/**
* Important! Mongoose buffers all the commands until it's connected to the database.
* This means that you don't have to wait until it connects to MongoDB in order
* to define models, run queries, etc.
*/
mongoose.connect( mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// Create Schema for entity
const carSchema = mongoose.Schema({
   brand: String,
   model: String,
   year: Number,
   available: Boolean
});

// Create entity Model
const Car = mongoose.model('Car', carSchema);


// 3000 is for client
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Express server is running on port ${port}`));
