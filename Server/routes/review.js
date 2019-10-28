const express = require('express');
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/review');
const Reviews = require('../models/reviews');
const router = express.Router({ mergeParams: true });

const advResults = require('../middleware/advResults');
const { protect, authorize } = require('../middleware/auth');

// router.use(protect);
// router.use(authorize('admin'));

router
  .route('/')
  .get(
    advResults(Reviews, {
      path: 'bootcamp',
      select: ['name', 'description']
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);
router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('user', 'admin'), updateReview)
  .delete(protect, authorize('user', 'admin'), deleteReview);

module.exports = router;
