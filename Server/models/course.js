const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a Desc'],
    trim: true
  },
  weeks: {
    type: String,
    required: [true, 'Please add a Duration']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add Cost']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please define min'],
    enum: ['beginner', 'intermediate', 'advance']
  },
  ScholarshipAvailable: {
    type: Boolean,
    default: false
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
// Static method
courseSchema.statics.getAverageCost = async function(id) {
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
        averageCost: { $avg: '$tuition' }
      }
    }
  ]);
  try {
    await this.model('Bootcamp').findByIdAndUpdate(id, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    });
  } catch (err) {
    console.log(err);
  }
};
// Calc ab=vg cost after save
courseSchema.post('save', function() {
  this.constructor.getAverageCost(this.bootcamp);
});
// Calc ab=vg cost after delete
courseSchema.pre('remove', function() {
  this.constructor.getAverageCost(this.bootcamp);
});
module.exports = mongoose.model('course', courseSchema);
