const express = require('express');
const {
  register,
  login,
  getCurrentUser,
  forgotPassword,
  updateUser,
  updateUserPassword
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();
router.post('/register', register);
router.get('/login', login);
router.get('/user', protect, getCurrentUser);
router.put('/user', protect, updateUser);
router.put('/user/updatepassword', protect, updateUserPassword);
router.post('/forgotPassword', forgotPassword);
module.exports = router;
