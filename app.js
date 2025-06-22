const express = require('express');
const mongoose = require('mongoose');
const { authRouter } = require('./routes/authRoutes.js');
const { userRouter } = require('./routes/usersRoutes.js');
const { authorize } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/spaceexplorer')
  .then(() => console.log('Banco de dados conectado!'))
  .catch((error) => console.log('Erro ao conectar o banco de dados: ', error));

app.use(express.json());

app.use(requestLogger);

app.use(authRouter);

app.use(authorize, userRouter);

app.use(errorLogger);

app.listen(3000, () => {
  console.log(`App listening at port 3000`);
});
