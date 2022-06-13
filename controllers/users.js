const User = require('../models/user');

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
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about })
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar })
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
