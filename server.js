const express = require('express');
const app = express();


app.get('/api/users', (request, response) => {
    /*
    response.end(
       JSON.stringify([
           { user: 1, name: 'Hulk' }
       ]));
   */

   response.json([
           { id: 1, name: 'Hulk' },
           { id: 2, name: 'Thor' },
           { id: 3, name: 'Batman' }
       ]);
});


// 3000 is for client
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Express server is running on port ${port}`));