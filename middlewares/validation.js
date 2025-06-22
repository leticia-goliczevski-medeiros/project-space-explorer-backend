const validator = require('validator');

function validateURL(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error('string.uri');
}

function validateEmail(value, helpers) {
  if (validator.isEmail(value)) {
    return value;
  }

  return helpers.error('string.email');
}

function validateDate(value, helpers) {
  const isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);

  if (!isValidDateFormat) {
    return helpers.error('string.pattern.base');
  }

  return value;
}

module.exports = { validateURL, validateEmail, validateDate };
