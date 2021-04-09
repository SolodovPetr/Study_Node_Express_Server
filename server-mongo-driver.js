const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

// "mongodb+srv://<user>:<pass>@clustername.4we6j.mongodb.net/<dbname>?retryWrites=true&w=majority";
const { uri: mongoUri } = require('./mogodbCredentials');

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const client = new MongoClient(mongoUri, options);


app.get('/api/users/add', async (request, response) => {
    /**
     * Add user to Collection
     * Example 1
     *
    client.connect( async error => {
        if ( !error ) {
            const collection = client.db('studyDatabase').collection('users');
            await collection.insertOne({name: 'Iron Man', role: 'hero'});
            response.json({success: true});
            client.close();
        } else {
            console.log('Connect error:', error);
        }
    });
    */

    // Example 2
    try {
        await client.connect();
        const db = client.db('studyDatabase');
        const collection = db.collection('users');
        const query = await collection.insertOne({name: 'Spider Man', role: 'hero'});

        response.status(200).json({success: true});

    } catch ( error ) {
        console.log('Db error:', error);
    } finally {
        client.close();
    }

});


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
