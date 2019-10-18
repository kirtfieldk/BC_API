const mongoose = require('mongoose');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
require('../models/bootcamp');
const Bootcamp = mongoose.model('Bootcamp');

// Get all Bootcamps
// ROUTE GET /api/v1/bootcamps
// Access public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const response = await Bootcamp.find();
  res.status(200).json({ msg: 'Success', data: response });
});
// get one Bootcamp
// ROUTE GET /api/v1/bootcamps/:id
// Access public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const response = await Bootcamp.findById(req.params.id);
  if (!Bootcamp)
    return next(
      new ErrorResponse(`Cannot fetch from database: ${req.params.id}`, 404)
    );
  res.status(200).json({ msg: 'Sucess', data: response });
});
// ROUTE DELETE /api/v1/bootcamps/:id
// Access private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  await Bootcamp.findByIdAndDelete(req.params.id);
  if (!Bootcamp)
    return next(
      new ErrorResponse(`Cannot fetch from database: ${req.params.id}`, 404)
    );
  res.status(200).json({ msg: 'Success', data: {} });
});
// ROUTE PUT /api/v1/bootcamps/:id
// Access private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const response = await Bootcamp.create(req.body);
  res.status(201).json({
    msg: 'Success',
    data: response
  });
});
// ROUTE PUT /api/v1/bootcamps/:id
// Access private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const response = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!Bootcamp)
    return next(
      new ErrorResponse(`Cannot fetch from database: ${req.params.id}`, 404)
    );
  res.status(200).json({ msg: 'Success', data: response });
});
