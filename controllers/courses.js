const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const Courses = require('../models/course');
const Bootcamp = require('../models/bootcamp');

// GET all Courses
// 2 ROutes
// Get all courses and courses of specific BC
// GET api/v1/courses
// GET api/v1/courses/:bootcampId/courses
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Courses.find({ bootcamp: req.params.bootcampId });
  } else
    query = Courses.find().populate({
      path: 'bootcamp',
      select: ['name', 'description']
    });
  const course = await query;
  res.status(200).json({
    msg: 'Success',
    count: course.length,
    data: course
  });
});
// GET single course
// api/v1/courses/:id
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });
  if (!course)
    return next(
      new ErrorResponse(`No course with id of: ${req.params.id}`),
      404
    );
  return res.status(200).json({
    msg: 'Success',
    count: course.length,
    data: course
  });
});
// POST api/v1/bootcamp/:bootcampId/courses
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const camp = await Bootcamp.findById(req.params.bootcampId);
  if (!camp)
    return next(
      new ErrorResponse(`No bootcamp with id of: ${req.params.bootcampId}`),
      404
    );

  const course = await Courses.create(req.body);
  return res.status(200).json({
    msg: 'Success',
    count: course.length,
    data: course
  });
});

// PUT api/v1/courses/:id
exports.addCourse = asyncHandler(async (req, res, next) => {
  let course = await Courses.findById(req.params.id);
  if (!course)
    return next(
      new ErrorResponse(`No Course with id of: ${req.params.id}`),
      404
    );

  course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  return res.status(200).json({
    msg: 'Success',
    count: course.length,
    data: course
  });
});
