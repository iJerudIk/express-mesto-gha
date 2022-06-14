const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers); // Получение пользователей
router.get('/:userId', getUserById); // Получение пользователей по id
router.post('/', createUser); // Создание пользователя
router.patch('/me', updateUser); // Обновление данных пользователя
router.patch('/me/avatar', updateUserAvatar); // Обновление аватара пользователя

module.exports = { userRoutes: router };
