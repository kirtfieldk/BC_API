const {
  getBootcamps,
  getBootcamp,
  updateBootcamp,
  deleteBootcamp,
  createBootcamp
} = require('../controllers/bc');
const express = require('express');
const router = express.Router();

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .delete(deleteBootcamp)
  .put(updateBootcamp);

module.exports = router;
