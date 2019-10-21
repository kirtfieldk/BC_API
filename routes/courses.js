const { getCourses } = require('../controllers/courses');
const express = require('express');
const router = express.Router({
  mergeParams: true
});

router.route('/').get(getCourses);

module.exports = router;
