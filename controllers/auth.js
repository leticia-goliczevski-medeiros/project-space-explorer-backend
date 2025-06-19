const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function login(req, res) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'devMode', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((error) => {
      console.log(error);
    });
}

function createUser(req, res) {
  const {
    email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash,
    }))
    .then((user) => {
      if (!user) {
        console.log('Unable to create the user.');
      }

      res.status(201).send({ email: user.email, _id: user._id });
    })
    .catch((error) => {
      if (error.code === 11000) {
        return console.log('This email has already been registered.');
      }
      return console.log(error);
    });
}

module.exports = { login, createUser };
