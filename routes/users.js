const router = require('express').Router();
const User = require('../models/user.js');

const checkErrors = (err, res) => {
  if(err.name === "ValidationError"){
    res.status(400).send({ message: "Переданы некорректные данные" });
    return;
  }
  if(err.name === 'CastError'){
    res.status(404).send({ message: "Пользователь не найден" });
    return;
  }
  res.status(500).send({ message: "Неизвестная ошибка" });
  return;
}

router.get('/users', (req, res) => { // Получение пользователей
  User.find({})
    .then((data) => {res.send(data)})
    .catch((err) => {checkErrors(err, res)})
})

router.get('/users/:userId', (req, res) => { // Получение пользователей по id
  User.findById(req.params.userId)
    .then((data) => {res.send(data)})
    .catch((err) => {checkErrors(err, res)})
})

router.post('/users', (req, res) => { // Создание пользователя
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => {res.send(data)})
    .catch((err) => {checkErrors(err, res)})
})

router.patch('/users/me', (req, res) => { // Обновление данных пользователя
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about })
    .then((data) => {res.send(data)})
    .catch((err) => {checkErrors(err, res)})
})

router.patch('/users/me/avatar', (req, res) => { // Обновление аватара пользователя
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar })
    .then((data) => {res.send(data)})
    .catch((err) => {checkErrors(err, res)})
})

module.exports = {userRoutes: router};
