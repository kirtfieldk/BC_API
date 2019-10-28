const mongoose = require('mongoose');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');
require('../models/user');
const User = mongoose.model('User');

// GET api/v1/auth/register
// Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  sendTokenResponse(user, 200, res);
});
// GET api/v1/auth/login
// Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //   Validate email and password
  if (!email || !password)
    return next(new ErrorResponse('Please provide email and password', 400));
  // Check user
  const user = await User.findOne({ email }).select('+password');
  if (!user) return next(new ErrorResponse('Invalid credientals', 401));
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorResponse('Invalid credientals', 401));
  sendTokenResponse(user, 200, res);
});

// Get token, cookie, and response
const sendTokenResponse = (user, statusCode, res) => {
  //   token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') options.secure = true;
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ msg: 'Success', token });
};
// Current login User
// GET api/v1/auth/user
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    msg: 'Success',
    data: user
  });
});

// Logout user and clear cookie
// GET api/v1/auth/logout
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({
    msg: 'Success',
    data: {}
  });
});

// Forot password
// GET api/v1/auth/forgotpassword
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorResponse('No user with that email', 404));
  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    msg: 'Success',
    data: user
  });
});

// Current login User updates info
// PUT api/v1/auth/user
exports.updateUser = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    msg: 'Success',
    data: user
  });
});

// Current login User Password
// PUT api/v1/auth/user/updatepassword
exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  // Check Cuurent password
  if (!(await user.matchPassword(req.body.currentPassword)))
    return next(new ErrorResponse('Password is incorrect'), 401);
  user.password = req.body.newPassword;
  await user.save();
  sendTokenResponse(user, 200, res);
});
