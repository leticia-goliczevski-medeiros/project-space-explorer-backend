const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');

function getUser(req, res, next) {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(`User with ID ${userId} could not be found.`);
    })
    .then((user) => res.send(user))
    .catch((error) => {
      next(error);
    });
}

function getUserGallery(req, res, next) {
  User.findById(req.user._id).populate('gallery')
    .orFail(() => {
      throw new NotFoundError('Gallery not found for this user.');
    })
    .then((user) => res.send(user))
    .catch((error) => {
      next(error);
    });
}

module.exports = { getUser, getUserGallery };
