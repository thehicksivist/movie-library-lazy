const express = require('express');

let routes = function (Movie) {
    let movieRouter = express.Router();
    let movieController = require('../controllers/movieController')(Movie)

    // define routes here
    movieRouter.route('/movies')
        .post(movieController.post) 
        .get(movieController.get)

    movieRouter.route('/movies/:movieId')
        .get(movieController.get)
        .delete(movieController.delete)

   return movieRouter;
}

module.exports = routes;
