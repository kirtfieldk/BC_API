const ErrorResponse = require('../util/errorResponse');
const asyncHandler = require('../middleware/async');
const Courses = require('../models/course');

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
