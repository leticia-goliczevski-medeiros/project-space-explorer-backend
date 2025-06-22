const express = require('express');
const { getUser, getUserGallery } = require('../controllers/users');
const { addCardLike, removeCardLike } = require('../controllers/cards');

const userRouter = express.Router();

userRouter.get('/users/me', getUser);
userRouter.get('/users/me/gallery', getUserGallery);
userRouter.post('/users/me/gallery', addCardLike);
userRouter.delete('/users/me/gallery/:id', removeCardLike);

module.exports = { userRouter };
