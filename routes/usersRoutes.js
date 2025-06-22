const express = require('express');
const { getUser, getUserGallery } = require('../controllers/users');
const { addCardLike, removeCardLike } = require('../controllers/cards');
const { Joi, celebrate } = require('celebrate');
const { validateURL, validateDate } = require('../middlewares/validation');

const userRouter = express.Router();

userRouter.get('/users/me', getUser);

userRouter.get('/users/me/gallery', getUserGallery);

userRouter.post('/users/me/gallery',celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    explanation: Joi.string().required(),
    url: Joi.string().custom(validateURL).required(),
    date:Joi.string().custom(validateDate).required(),
  }),
}), addCardLike);

userRouter.delete('/users/me/gallery/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), removeCardLike);

module.exports = { userRouter };
