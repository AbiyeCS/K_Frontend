const express = require(`express`);
const path = require(`path`);
const nunjucks = require(`nunjucks`);
const bodyParser = require('body-parser');

import { Request, Response } from "express";

const app = express(); // Creates an instance of an Express app

//Configure nunjucks
const appViews = path.join(__dirname,'/views'); // Sets the directory where the nunjucks templates are located

const nunjucksConfig = {
    autoescape: true, // Escapes output by default to prevent XSS attacks
    noCache: true, // Disables template chaching for development purposes
    express: app // Binds nunjucks to the express app
};

nunjucks.configure(appViews, nunjucksConfig);

app.use(express.json()) // This line adds a middleware that parses incoming requests with JSON payloads. It is a built-in middleware function
app.use(express.urlencoded({extended: true})); // This line adds a middleware that parses incoming requests with URL-encoded payloads. It is used to parse the data sent through HTML forms using the application/x-www-form-urlencoded encoding.

// Configure Express
app.set('view engine', 'html'); // Sets the deafult file extension for views to .html
app.use('/public', express.static(path.join(__dirname, 'public'))); // Serves static files from the public directory
app.listen(3000, () => { // Starts the server on port 3000 and logs a messages to the the console
    console.log('Server listening on port 3000');
});

// Express Routes

app.get('/', (req: Request, res: Response) => {
    res.render('pizza', {
        title: "New Pizza Time"
    }); 
}) // Defines a route for the root URL. When a GET request is made to the root URL, it renders the piiza.html template

require('./controller/productController')(app); //imports the routes defined in product controller into our main express application 

require('./controller/orderController')(app);


