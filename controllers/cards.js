const Card = require('../models/card');

const checkErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
    return;
  }
  if (err.name === 'CastError') {
    res.status(404).send({ message: 'Пользователь не найден' });
    return;
  }
  res.status(500).send({ message: 'Неизвестная ошибка' });
};
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, {new: true, runValidators: true, upsert: true})
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, {new: true, runValidators: true, upsert: true})
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
