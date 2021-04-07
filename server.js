const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

// "mongodb+srv://<user>:<pass>@clustername.4we6j.mongodb.net/<dbname>?retryWrites=true&w=majority";
const { uri: mongoUri } = require('./mogodbCredentials');

const options = { useNewUrlParser: true, useUnifiedTopology: true };
MongoClient.connect(mongoUri, options,
    (error, client) => {
        error ? console.log('DB connection error:', error) :
                console.log('Connection to DB is OK!');
});

/**
 *  Example from Cluster
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
*/


app.get('/api/users', (request, response) => {
    response.json([
           { id: 1, name: 'Hulk' },
           { id: 2, name: 'Thor' },
           { id: 3, name: 'Batman' }
       ]);
});


// 3000 is for client
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Express server is running on port ${port}`));
