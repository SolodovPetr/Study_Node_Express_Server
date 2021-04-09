const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

// parse application/json
app.use(bodyParser.json())

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

app.post('/api/car/add', (request, response) => {

    // Create instance of Model with data
    const addCar = new Car(request.body);

    // Save to DB
    addCar.save( (error, document) => {
        if ( error ) {
            response.json(error);
        } else {
            response.status(200).json(document)
        }
    });

});

app.get('/api/cars', (request, response) => {
    /*
    // find all documents
    Car.find( (error, docs) => {
        if ( error ) {
            response.json(error);
        } else {
            response.status(200).json(docs)
        }
    });
    */

    // find by brand field example
    Car.find( { brand: 'Mazda' }, (error, docs) => {
        if ( error ) { return response.json(error); }
        response.status(200).json(docs)
    });

});


// 3000 is for client
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Express server is running on port ${port}`));
