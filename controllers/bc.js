const mongoose = require('mongoose');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../util/geocoder');
require('../models/bootcamp');
const Bootcamp = mongoose.model('Bootcamp');

// Get all Bootcamps
// ROUTE GET /api/v1/bootcamps
// Access public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query };
  // FIelds to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(doc => delete reqQuery[doc]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  let query = Bootcamp.find(JSON.parse(queryStr));
  // SELECT FIELDS
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    console.log(fields);
    query = query.select(fields);
  }
  // Sort
  if (req.query.sort) {
    const fields = req.query.sort.split(',').join(' ');
    query = query.sort(fields);
  } else {
    query = query.sort('-createdAt');
  }
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();
  query = query.skip(startIndex).limit(limit);
  const response = await query;

  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if (startIndex > 0) {
    pagination.pre = {
      page: page - 1,
      limit
    };
  }
  res
    .status(200)
    .json({
      msg: 'Success',
      count: response.length,
      pagination,
      data: response
    });
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

// ROUTE GET /api/vi/radius/:zipcode/:distance
// Access Public
exports.getBootcampsRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});
