const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();
router.post('/register', register);
router.get('/login', login);
router.get('/user', protect, getCurrentUser);
module.exports = router;
