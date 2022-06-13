const router = require('express').Router();
const Card = require('../models/card.js');

const checkErrors = (err, res) => {
  if(err.name === "ValidationError"){
    res.status(400).send({ message: "Переданы некорректные данные" });
    return;
  }
  if(err.name === 'CastError'){
    res.status(404).send({ message: "Карточка не найдена" });
    return;
  }
  res.status(500).send({ message: "Неизвестная ошибка" });
  return;
}

router.get('/cards', (req, res) => { // Получение карточек
  Card.find({})
    .then((data) => {res.send(data)})
    .catch((err) => {checkErrors(err, res)})
})

router.post('/cards', (req, res) => { // Создание карточек
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => {res.send(data)})
    .catch((err) => {checkErrors(err, res)})
})

router.delete('/cards/:cardId', (req, res) => { // Удаление карточек
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((data) => {res.send(data)})
    .catch((err) => {checkErrors(err, res)})
})

router.put('/cards/:cardId/likes', (req, res) => { // Постановка лайка
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((data) => {res.send(data)})
    .catch((err) => {checkErrors(err, res)})
})

router.delete('/cards/:cardId/likes', (req, res) => { // Снятие лайка
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((data) => {res.send(data)})
    .catch((err) => {checkErrors(err, res)})
})

module.exports = {cardRoutes: router};
