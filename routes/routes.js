const {
  getBootcamps,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  createBootcamp,
  getBootcampsRadius,
  bootcampPhotoUpload
} = require('../controllers/bc');
const Bootcamp = require('../models/bootcamp');
const advResults = require('../middleware/advResults');
const express = require('express');
const router = express.Router();
// Include other resorce router
const courseRouter = require('./courses');
// Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);
//
router.route('/radius/:zipcode/:distance').get(getBootcampsRadius);
router.route('/:id/photo').put(bootcampPhotoUpload);
router
  .route('/')
  .get(advResults(Bootcamp, 'Courses'), getBootcamps)
  .post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .delete(deleteBootcamp)
  .put(updateBootcamp);

module.exports = router;
