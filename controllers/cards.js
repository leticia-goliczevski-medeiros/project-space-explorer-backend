const validator = require('validator');
const Card = require('../models/card');
const User = require('../models/user');
const InvalidDataError = require('../errors/invalidDataError');
const ServerError = require('../errors/serverError');

function addCardLike(req, res, next) {
  const {
    title, explanation, url, date,
  } = req.body;
  const userId = req.user._id;

  if (!title || !explanation || !url || !date) {
    throw new InvalidDataError('All fields are required.');
  }

  if (!validator.isURL(url)) {
    throw new InvalidDataError('The URL must be a valid link.');
  }

  Card.findOne({ url, date })
    .then((existingCard) => {
      if (existingCard) {
        return existingCard;
      }

      return Card.create({
        title, explanation, url, date,
      });
    })
    .then((card) => User.findByIdAndUpdate(
      userId,
      { $addToSet: { gallery: card._id } },
      { new: true },
    ).populate('gallery')
      .orFail(() => {
        throw new ServerError(`Failed to like the card with ID ${card._id}.`);
      })
      .then((user) => res.send(user.gallery))
      .catch((error) => {
        next(error);
      }))
    .then((user) => res.send(user))
    .catch((error) => {
      next(error);
    });
}

function removeCardLike(req, res, next) {
  const { id: cardId } = req.params;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { $pull: { gallery: cardId } },
    { new: true },
  ).populate('gallery')
    .orFail(() => {
      throw new ServerError(`Failed to unlike the card with ID ${cardId}.`);
    })
    .then((user) => res.send(user))
    .catch((error) => {
      next(error);
    });
}

module.exports = {
  addCardLike,
  removeCardLike,
};
