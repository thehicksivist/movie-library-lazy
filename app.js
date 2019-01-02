const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')

// Connect to database
let db;
let host = process.env.HOST || 'localhost';
let dbName = process.env.DB_NAME || 'movieAPI';
let connectString = `mongodb://${host}/${dbName}`;

if (process.env.ENV == 'test') {
    connectString += '_test';
    db = mongoose.connect(connectString, { useNewUrlParser: true });
    console.log(`Connected to db at ${connectString}`);
}
else {
    db = mongoose.connect(connectString, { useNewUrlParser: true });
    console.log(`Connected to db at ${connectString}`);
}

let app = express();

// Use bodyParser.json
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Bring in the movie model
let Movie = require('./models/movieModel');

let movieRouter = require('./routes/movieRoutes')(Movie)

app.use('/api/', movieRouter);

// Send basic welcome message for root route
app.get('/', function (req, res) {
    res.send('Welcome to the movie library API');
});

// Start the app on the configured port (or default port)
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App is running on port ${port}`);
});

module.exports = app;