const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'A valid email is required.',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  gallery: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'card',
    default: [],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Invalid email or password.');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Invalid email or password.');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
