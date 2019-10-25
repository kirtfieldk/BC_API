const mongoose = require('mongoose');
const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../util/geocoder');
const path = require('path');
require('../models/bootcamp');
const Bootcamp = mongoose.model('Bootcamp');

// Get all Bootcamps
// ROUTE GET /api/v1/bootcamps
// Access public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advResult);
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
  const removed = await Bootcamp.findById(req.params.id);
  if (!removed)
    return next(
      new ErrorResponse(`Cannot fetch from database: ${req.params.id}`, 404)
    );
  if (response.user.toString() !== req.user.id && req.user.role !== 'admin')
    return next(new ErrorResponse('User not able to update', 401));
  await removed.remove();
  res.status(200).json({ msg: 'Success', data: {} });
});
// ROUTE PUT /api/v1/bootcamps/:id
// Access private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  // Check for publish bootcamp
  const published = await Bootcamp.findOne({ user: req.user.id });
  // If user is not admin they can only publish one Boot
  if (published && req.user.role !== 'admin')
    return next(
      new ErrorResponse(
        `User with id${req.user.id} already has one Bootcamp`,
        401
      )
    );
  const response = await Bootcamp.create(req.body);

  res.status(201).json({
    msg: 'Success',
    data: response
  });
});
// ROUTE PUT /api/v1/bootcamps/:id
// Access private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let response = await Bootcamp.findById(req.params.id);
  if (!Bootcamp)
    return next(
      new ErrorResponse(`Cannot fetch from database: ${req.params.id}`, 404)
    );
  if (response.user.toString() !== req.user.id && req.user.role !== 'admin')
    return next(new ErrorResponse('User not able to update', 401));
  response = await Bootcamp.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
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
// Upload image for bootcamp
// ROUTE PUT /api/v1/bootcamps/:id/photo
// Access private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp)
    return next(
      new ErrorResponse(`Cannot fetch from database: ${req.params.id}`, 404)
    );
  if (response.user.toString() !== req.user.id && req.user.role !== 'admin')
    return next(new ErrorResponse('User not able to update', 401));
  if (!req.files) {
    return next(new ErrorResponse('Please upload a file'), 400);
  }
  const file = req.files.files;
  // MAke sure image is photo
  if (!file.mimetype.startsWith('image'))
    return next(new ErrorResponse('Please upload image'), 400);
  // Check file size,400z
  if (file.size > process.env.MAX_FILE_SIZE)
    return next(
      new ErrorResponse(`Max file size: ${process.env.MAX_FILE_SIZE}`),
      400
    );
  // Rename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  console.log(file.name);
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse('Error'), 400);
    }
    await bootcamp.update({ photo: file.name });
    res.status(200).json({
      msg: 'Success',
      data: file.name
    });
  });
});
