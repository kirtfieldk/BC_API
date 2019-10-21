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
  }
});
module.exports = mongoose.model('course', courseSchema);
