const express = require('express');
const router = express.Router();

const users = require('./controllers/users');
const movies = require('./controllers/movies');

router.post('/user-list', users.getUserList);
router.post('/register',users.postRegister);
router.post('/login',users.postLogin);
router.get('/movies', movies.getMovies);

module.exports = router;