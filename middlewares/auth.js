const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

module.exports.auth = (req, res, next) => {
  if (!req.cookies.token) handleAuthError(res);
  else {
    let payload;

    try {
      payload = jwt.verify(req.cookies.token, 'super-strong-secret');
    } catch (err) { handleAuthError(res); }

    req.user = payload;
    next();
  }
};
