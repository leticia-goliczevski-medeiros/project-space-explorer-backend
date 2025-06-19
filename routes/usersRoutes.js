const express = require('express');
const { getUser } = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users/me', getUser);

module.exports = { userRouter };
