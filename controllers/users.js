const User = require('../models/user');
const { checkErrors } = require('../utils/utils');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => { res.send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => { res.status(201).send(data); })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => { checkErrors(err, res); });
};
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => { checkErrors(err, res); });
};
