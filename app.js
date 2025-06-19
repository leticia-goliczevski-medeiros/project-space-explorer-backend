const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/aroundb')
  .then(() => console.log('Banco de dados conectado!'))
  .catch((error) => console.log('Erro ao conectar o banco de dados: ', error));

app.use(express.json());

app.listen(3000, () => {
  console.log(`App listening at port 3000`);
});
