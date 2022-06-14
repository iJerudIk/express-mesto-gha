const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');

const app = express(); // Создание приложения
mongoose.connect('mongodb://localhost:27017/mestodb'); // Подключение к БД

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = { _id: '62a62a93142d57b1965e78c8' };
  next();
});
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

// Запуск сервера
app.listen(3000);
