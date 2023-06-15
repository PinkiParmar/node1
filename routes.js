const express = require('express');
const router = express.Router();
const users = require('./controllers/users');
const movies = require('./controllers/movies');
const reqFilter= require('./middleware/middleware.js');

router.post('/user-list', users.getUserList);
router.post('/register',users.postRegister);
router.post('/login',users.postLogin);
router.post('/logout',users.postLogout);
router.post('/profile',reqFilter,users.postProfile);
router.get('/movies', reqFilter, movies.getMovies);
router.get('/movies-home',reqFilter, movies.getMoviesHome);
router.get('/movies-popular',reqFilter, movies.getMoviesPopular);
router.get('/movies-top-rated',reqFilter, movies.getMoviesTopRated);
router.get('/movies-upcoming',reqFilter, movies.getMoviesUpcoming);
module.exports = router;