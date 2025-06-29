require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { authRouter } = require('./routes/authRoutes');
const { userRouter } = require('./routes/usersRoutes');

const { authorize } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

mongoose.connect(process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/spaceexplorer')
  .then(() => console.log('Database connected!'))
  .catch((error) => console.log('Error connecting to the database: ', error));

app.use(express.json());

app.use(requestLogger);

app.use(authRouter);

app.use(authorize, userRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening at port ${process.env.PORT || 3000}`);
});
