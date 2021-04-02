const http = require('http');
const fs = require('fs');


const hostname = '127.0.0.1';
const port = 3000;

const colors = ['red', 'green', 'blue'];
const car = { brand: 'Ford', model: 'Fiesta', year: 2021 };
const HTML = fs.readFileSync(`${__dirname}/index.html`);

const server = http.createServer( (req, res) => {

    if ( req.url === '/' ) {
        res.writeHead(200,{ 'Content-type':'text/html'})
        res.end(HTML)
    } else if ( req.url === '/api/car') {
        res.writeHead(200,{ 'Content-type':'application/json'})
        const json = JSON.stringify( car )
        res.end(json)
    } else if ( req.url === '/api/colors') {
        res.writeHead(200,{ 'Content-type':'application/json'})
        const json = JSON.stringify( colors )
        res.end(json)
    }

    // 404 response
    res.writeHead(404);
    res.end();

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});