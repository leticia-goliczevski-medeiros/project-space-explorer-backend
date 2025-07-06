function errorHandler(error, req, res, next) {
  const { statusCode = 500, message = 'There was a server error.' } = error;

  res.status(statusCode).send({ message });
}

module.exports = { errorHandler };
