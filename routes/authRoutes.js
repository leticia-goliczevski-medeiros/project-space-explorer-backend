const express = require('express');
const { Joi, celebrate } = require('celebrate');
const { createUser, login } = require('../controllers/auth');
const { validateEmail } = require('../middlewares/validation');

const authRouter = express.Router();

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom(validateEmail).required(),
    password: Joi.string().required(),
  }),
}), login);

authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom(validateEmail).required(),
    password: Joi.string().required(),
  }),
}), createUser);

module.exports = { authRouter };
