let movieController = function (Movie) {
    let post = function (req, res) {
        if(req.body.title) {
        let movie = new Movie(req.body);
            movie.save();
            res.status(201)
            res.send(movie);
        } else {
            res.status(400)
            res.send('Title is required')
        }
    };
    let get = function (req, res) {
        if(req.params.movieId){
            Movie.findById(req.params.movieId, function (err, movie) {
                if (err) {
                    res.status(500)
                    res.send(err);
                } else if (movie) {
                    res.json(movie);
                } else {
                    res.status(404)
                    res.send('Movie not found');
                }
            })
        } else {
            let query = {};
            // query is whatever exists after a '?' in the URI
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
        }
    };
    let destroy = function (req, res) {
        Movie.findById(req.params.movieId, function (err, movie) {
            if (err)
                res.status(500).send(err);
            else {
                if (movie) {
                    movie.remove(function (remErr) {
                        if (remErr) {
                            res.status(500).send(remErr);
                        } else {
                            res.status(204).send('removed');
                        }
                    });
                }
                else {
                    res.status(500).send('Did not get movie to delete');
                }
            }
        })
    };
   return {
        post: post,
        get: get,
        delete: destroy
    };
 };
 module.exports = movieController;