require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimiter = require('./middlewares/rateLimiter');

const routes = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

mongoose.connect(process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/spaceexplorer')
  .then(() => console.log('Database connected!'))
  .catch((error) => console.log('Error connecting to the database: ', error));

app.use(express.json());

app.use(helmet());
app.use(rateLimiter);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening at port ${process.env.PORT || 3000}`);
});
