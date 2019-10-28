const mongoose = require('mongoose');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');
require('../models/bootcamp');
require('../models/reviews');
const Reviews = mongoose.model('Reviews');
const Bootcamp = mongoose.model('Bootcamp');

// GET all Reviews
// 2 ROutes
// Get all Reviews and Reviews of specific BC
// GET api/v1/Reviews
// GET api/v1/bootcamps/:bootcampId/Reviews
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const review = await Reviews.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      msg: 'Success',
      count: review.length,
      data: review
    });
  } else res.status(200).json(res.advResult);
});
// GET single review
// api/v1/review/:id
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Reviews.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });
  if (!review)
    return next(
      new ErrorResponse(`No review with id of: ${req.params.id}`, 404)
    );
  return res.status(200).json({
    msg: 'Success',
    count: review.length,
    data: review
  });
});

// POST single review
// api/v1/bootcamps/:bootcampId/reviews
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp)
    return next(
      new ErrorResponse(`No bootcamp with id of: ${req.params.bootcampId}`, 404)
    );
  const review = await Reviews.create(req.body);
  return res.status(201).json({
    msg: 'Success',
    count: review.length,
    data: review
  });
});

// PUT single review
// api/v1/reviews/:id
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Reviews.findById(req.params.id);
  if (!review)
    return next(
      new ErrorResponse(`No review with id of: ${req.params.id}`, 404)
    );
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin')
    return next(
      new ErrorResponse(`Not authorized with id of: ${req.params.id}`, 401)
    );
  review = await Reviews.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  return res.status(201).json({
    msg: 'Success',
    count: review.length,
    data: review
  });
});

// DELETE single review
// api/v1/reviews/:id
exports.deleteReview = asyncHandler(async (req, res, next) => {
  let review = await Reviews.findById(req.params.id);
  if (!review)
    return next(
      new ErrorResponse(`No review with id of: ${req.params.id}`, 404)
    );
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin')
    return next(
      new ErrorResponse(`Not authorized with id of: ${req.params.id}`, 401)
    );
  await Reviews.findByIdAndDelete(req.params.id);
  return res.status(201).json({
    msg: 'Success',
    count: review.length,
    data: {}
  });
});
