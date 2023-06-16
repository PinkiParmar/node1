const express = require('express');
const router = express.Router();
const users = require('./controllers/users');
const movies = require('./controllers/movies');
const reqFilter= require('./middleware/middleware.js');

router.post('/user-list', users.getUserList);
router.post('/register',users.postRegister);
router.post('/login',users.postLogin);
router.get('/view-profile',reqFilter, users.getViewProfile);
router.get('/movies-home',reqFilter, movies.getMoviesHome);
router.get('/movies-popular',reqFilter, movies.getMoviesPopular);
router.get('/movies-top-rated',reqFilter, movies.getMoviesTopRated);
router.get('/movies-upcoming',reqFilter, movies.getMoviesUpcoming);
router.post('/search', movies.getSearch);
module.exports = router;