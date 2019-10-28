const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title for the review'],
    trim: true
  },
  text: {
    type: String,
    required: [true, 'Please add a Desc'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Please add a Rating etween 1-10'],
    min: 1,
    max: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});
// Prevent multiple reviews
reviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static method
reviewSchema.statics.getAverageRating = async function(id) {
  console.log('Started');
  // Called pipeline
  // List of steps in order
  const obj = await this.aggregate([
    {
      $match: { bootcamp: id }
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);
  try {
    await this.model('Bootcamp').findByIdAndUpdate(id, {
      averageRating: obj[0].averageRating
    });
  } catch (err) {
    console.log(err);
  }
};
// Calc ab=vg cost after save
reviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.bootcamp);
});
// Calc ab=vg cost after delete
reviewSchema.pre('remove', function() {
  this.constructor.getAverageRating(this.bootcamp);
});
module.exports = mongoose.model('Reviews', reviewSchema);
