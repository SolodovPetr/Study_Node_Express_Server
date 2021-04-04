const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const html = '<html lang="en"><body><h1 style="background: lemonchiffon">Express html</h1></body></html>';

const HTML = fs.readFileSync(`${__dirname}/index.html`);

// Middleware, do something on all the routes - /public/css
app.use('/public/css', express.static(__dirname + '/public/css'));

// Middleware for all routes
app.use('/', (req, res, next) => {
    console.log('Requested url is:', req.url);
    // set cookies
    res.cookie('Express', 'Cookie');
    next();
});

// Middleware for specific route
const myMiddleware = (req, res, next) => {
    console.log('My middleware fires!');
    const { id, model } = req.params;

    if ( id && model ) {
        console.log('ID:', id);
        console.log('Model:', model);
    }

    next();
};

app.get('/', myMiddleware, (request, response) => {
    // response.send(HTML) // load the HTML
    response.end(HTML);
})

// Params
app.get('/api/car/:model/:id', myMiddleware, (request, response) => {
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


/**
 * Body parser use example
 */
// Add middleware for body parse - application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// Step 1 - listen on client get request to '/user'
app.get('/user', (req, res) => {
    // Step 2 - read html file for 'user' route
    const USER_HTML = fs.readFileSync(`${__dirname}/views/user.html`);
    // Step 3 - response with html, witch contains post request to 'api/adduser'
    res.end(USER_HTML);

})

// Step 3 - listen on client post request to '/api/adduser',
// read parsed body and response with status 200.
app.post('/api/adduser', (request, response) => {
    console.log( request.body );
    response.sendStatus(200)
})


// Dynamic port for live server
const port = process.env.PORT || 3000
app.listen(port)