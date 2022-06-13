const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers); // Получение пользователей
router.get('/users/:userId', getUserById); // Получение пользователей по id
router.post('/users', createUser); // Создание пользователя
router.patch('/users/me', updateUser); // Обновление данных пользователя
router.patch('/users/me/avatar', updateUserAvatar); // Обновление аватара пользователя

module.exports = { userRoutes: router };
