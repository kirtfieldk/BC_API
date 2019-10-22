const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');
const Course = require('../models/course');
const advResults = require('../middleware/advResults');
const express = require('express');
const router = express.Router({
  mergeParams: true
});

router
  .route('/')
  .get(
    advResults(Course, {
      path: 'bootcamp',
      select: ['name', 'description']
    }),
    getCourses
  )
  .post(addCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
