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
const { protect, authorize } = require('../middleware/auth');
const express = require('express');
const router = express.Router();
// Include other resorce router
const courseRouter = require('./courses');
const reviewRouter = require('./review');
// Re-route into other resource router
router.use('/:bootcampId/review', reviewRouter);
router.use('/:bootcampId/courses', courseRouter);
//
router.route('/radius/:zipcode/:distance').get(getBootcampsRadius);
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);
router
  .route('/')
  .get(advResults(Bootcamp, 'Courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp);

module.exports = router;
