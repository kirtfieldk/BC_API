const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/admin');

const User = require('../models/user');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router
  .route('/users')
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
