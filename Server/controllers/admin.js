const mongoose = require('mongoose');
const asyncHandler = require('../middleware/async');
require('../models/user');
const User = mongoose.model('User');
// GET all user
// /api/v1/auth/users
// Private (admin)
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advResult);
});
// Get single User
// /api/v1/auth/users/:id
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    msg: 'Success',
    data: user
  });
});

// Post single User
// /api/v1/auth/users
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    msg: 'Success',
    data: user
  });
});
// PUT single User
// /api/v1/auth/users/:id
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(201).json({
    msg: 'Success',
    data: user
  });
});
// DELETE single User
// /api/v1/auth/users/:id
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(201).json({
    msg: 'Success',
    data: {}
  });
});
