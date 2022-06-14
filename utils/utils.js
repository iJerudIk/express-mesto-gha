module.exports.checkErrors = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
    return;
  }
  res.status(500).send({ message: 'Неизвестная ошибка' });
};
