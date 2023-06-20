const express = require('express');
const router = express.Router();
const users = require('./controllers/users');
const movies = require('./controllers/movies');
const reqFilter= require('./middleware/middleware.js');

router.post('/user-list', users.getUserList);
router.post('/register',users.postRegister);
router.post('/login',users.postLogin);
router.get('/view-profile',reqFilter, users.getViewProfile);
router.post('/update-profile',reqFilter, users.postUpdateProfile);
router.post('/forget-password',users.postForgetPassword);
// router.post('/set-password',users.postSetPassword);
 router.post('/re-set-password',users.postReSetPassword);
router.get('/movies-home',reqFilter, movies.getMoviesHome);
router.get('/movies-popular',reqFilter, movies.getMoviesPopular);
router.get('/movies-top-rated',reqFilter, movies.getMoviesTopRated);
router.get('/movies-upcoming',reqFilter, movies.getMoviesUpcoming);
//router.post('/search', movies.getSearchMovieByName);
//router.post('/search', movies.getSearchMovieByCate);
//router.post('/search', movies.getSearchMovieByStarCast);

module.exports = router;