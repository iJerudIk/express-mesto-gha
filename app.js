const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { userRoutes } = require('./routes/users.js');
const { cardRoutes } = require('./routes/cards.js');

const app = express(); // Создание приложения
mongoose.connect('mongodb://localhost:27017/mestodb'); // Подключение к БД

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = { _id: '62a62a93142d57b1965e78c8' };
  next();
})
app.use('/', userRoutes);
app.use('/', cardRoutes);

// Запуск сервера
app.listen(3000, () => {
  console.log('App listening on port 3000');
})
