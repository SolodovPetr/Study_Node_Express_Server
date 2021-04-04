const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

/**
 * Body parser use example
 */
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Step 1 - listen on client get request to '/form'
app.get('/form', (req, res) => {
    // Step 2 - read html file for '/form' route
    const FORM_HTML = fs.readFileSync(`${__dirname}/views/form.html`);
    // Step 3 - response with html
    res.end(FORM_HTML);

})

// Step 3 - listen on client post request to '/api/form-post',
// read parsed body and response with status 200.
app.post('/api/form-post', (request, response) => {
    const { name, age } = request.body;
    console.log('Name:', name.trim());
    console.log('Age:', age.trim());
    response.sendStatus(200)
})


// Dynamic port for live server
const port = process.env.PORT || 3000;
app.listen(port);