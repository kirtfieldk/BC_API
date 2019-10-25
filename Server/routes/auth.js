const express = require('express');
const {
  register,
  login,
  getCurrentUser,
  forgotPassword
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();
router.post('/register', register);
router.get('/login', login);
router.get('/user', protect, getCurrentUser);
router.post('/forgotPassword', forgotPassword);
module.exports = router;