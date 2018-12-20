// Import Express
const express = require('express')
// Import body parser
const bodyParser = require('body-parser')
// Import mongoose
const mongoose = require('mongoose')
// Initialise the app
let app = express()

// Import Routes 
const routes = require('./routes')

// Configure bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Connect to Mongoose
mongoose.connect('mongodb://localhost/artist-api')
let db = mongoose.connection

// Setup server Port
const port = process.env.PORT || 8000

// Send default message
app.get('/', (req, res) => res.send("Hello World!"))

// Use the routes in the app
app.use('/api', routes)

// Launch the app on specific port
app.listen(port, () => console.log(`App listening on port ${port}`))