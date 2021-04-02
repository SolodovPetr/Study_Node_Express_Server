const express = require('express');
const app = express();

const html = '<html lang="en"><body><h1 style="background: lemonchiffon">Express html</h1></body></html>';

app.get('/', (request, response) => {
    response.send(html)
})

app.get('/api/car', (request, response) => {
    response.send({
        model: 'Mustang',
        color: "Yellow"
    });
})

// Dynamic port for live server
const port = process.env.PORT || 3000
app.listen(port)