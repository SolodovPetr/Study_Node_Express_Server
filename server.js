const express = require('express');
const app = express();


app.get('/api/users', (request, response) => {
   response.end(
       JSON.stringify([
           { user: 1, name: 'Hulk' },
           { user: 2, name: 'Thor' }
       ]));
});


// 3000 is for client
const port = process.env.PORT || 3001
app.listen(port);