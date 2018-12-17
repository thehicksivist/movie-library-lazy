const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


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

let movieRouter = express.Router();


// Use bodyParser.json
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Bring in the movie model
let Movie = require('./models/movieModel');

movieRouter.route('/movies')
    .post(function (req, res) {
        let movie = new Movie(req.body);
        movie.save();
        res.status(201).send(movie);
    })
    .get(function (req, res) {
        // Return a list of all movies
        let query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Movie.find(query, function (err, movies) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(movies);
            }
        });
    });

movieRouter.route('/movies/:movieId')
    .get(function (req, res) {
        Movie.findById(req.params.movieId, function (err, movie) {
            if (err) {
                res.status(500).send(err);
            } else if (movie) {
                res.json(movie);
            } else {
                res.status(404).send('Movie not found');
            }
        })
    });

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