const express = require('express');
const router = express.Router();

const users = require('./controllers/users');

router.post('/user-list', users.getUserList);
router.post('/register',users.postRegister);
module.exports = router;