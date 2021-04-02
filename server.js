const http = require('http');
const fs = require('fs');

// Read files
const HTML = fs.readFileSync(`${__dirname}/index.html`);

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer( (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // Close connection, send response
    res.end(HTML);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});