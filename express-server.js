const express = require('express');
const app = express();

const html = '<html lang="en"><body><h1 style="background: lemonchiffon">Express html</h1></body></html>';

app.get('/', (request, response) => {
    response.send(html)
})

// Params
app.get('/api/car/:model/:id', (request, response) => {
    // get params from request - /api/car/sport/7
    const { id, model } = request.params;

    response.send({
        id,
        model,
        color: "Yellow"
    });
})

// Query string
app.get('/api/user', (request, response) => {
    // get params from query string - /api/user?name=Tom&age=21
    const { name, age } = request.query;

    response.send({
        name,
        age
    });
})

// Dynamic port for live server
const port = process.env.PORT || 3000
app.listen(port)