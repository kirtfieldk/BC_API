const { getCourses, getCourse, addCourse } = require('../controllers/courses');
const express = require('express');
const router = express.Router({
  mergeParams: true
});

router
  .route('/')
  .get(getCourses)
  .post(addCourse);
router.route('/:id').get(getCourse);

module.exports = router;
