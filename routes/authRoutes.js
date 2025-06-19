const express = require('express');
const { createUser, login } = require('../controllers/auth');

const authRouter = express.Router();

authRouter.post('/signin', login);

authRouter.post('/signup', createUser);

module.exports = { authRouter };
