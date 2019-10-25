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
  if (req.params.bootcampId) {
    const courses = await Courses.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      msg: 'Success',
      count: courses.length,
      data: courses
    });
  } else res.status(200).json(res.advResult);
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
  req.body.user = req.user.id;
  const camp = await Bootcamp.findById(req.params.bootcampId);
  if (!camp)
    return next(
      new ErrorResponse(`No bootcamp with id of: ${req.params.bootcampId}`),
      404
    );
  if (camp.user.toString() !== req.user.id && req.user.role !== 'admin')
    return next(
      new ErrorResponse('User not able to add couse to this Bootcamp', 401)
    );
  const course = await Courses.create(req.body);
  return res.status(200).json({
    msg: 'Success',
    count: course.length,
    data: course
  });
});

// PUT api/v1/courses/:id
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Courses.findById(req.params.id);
  if (!course)
    return next(
      new ErrorResponse(`No Course with id of: ${req.params.id}`),
      404
    );
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin')
    return next(new ErrorResponse('User not able to update', 401));
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
// DELETE api/v1/:id
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Courses.findById(req.params.id);
  if (!course)
    return next(
      new ErrorResponse(`No Course with id of: ${req.params.id}`),
      404
    );
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin')
    return next(new ErrorResponse('User not able to update', 401));
  await course.remove();
  return res.status(200).json({
    msg: 'Success'
  });
});
