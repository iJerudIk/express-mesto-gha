const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { celebrate, Joi } = require('celebrate');

const { cardRoutes } = require('./routes/cards');
const { userRoutes } = require('./routes/users');

const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express(); // Создание приложения
mongoose.connect('mongodb://localhost:27017/mestodb'); // Подключение к БД

app.use(cookieParser());
app.use(bodyParser.json());
app.use(limiter);

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/cards', auth, cardRoutes);
app.use('/users', auth, userRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

// Запуск сервера
app.listen(3000);
