const express = require('express');
const {
  register,
  login,
  getCurrentUser,
  forgotPassword,
  updateUser,
  updateUserPassword,
  logout
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/user', protect, getCurrentUser);
router.put('/user', protect, updateUser);
router.get('/logout', logout);
router.put('/user/updatepassword', protect, updateUserPassword);
router.post('/forgotPassword', forgotPassword);
module.exports = router;
