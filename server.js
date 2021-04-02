const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const colors = ['red', 'green', 'blue'];
const car = { brand: 'Ford', model: 'Fiesta', year: 2021 };

const server = http.createServer( (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    const json = JSON.stringify({
        colors,
        car
    });

    // Close connection, send response
    res.end(json);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});