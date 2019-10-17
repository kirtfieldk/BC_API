const mongoose = require('mongoose');
require('../models/bootcamp');
const Bootcamp = mongoose.model('Bootcamp');

// Get all Bootcamps
// ROUTE GET /api/v1/bootcamps
// Access public
exports.getBootcamps = async (req, res, next) => {
  try {
    const response = await Bootcamp.find();
    res.status(200).json({ msg: 'Success', data: response });
  } catch (err) {
    res.status(400).json({ msg: 'failure' });
  }
};
// get one Bootcamp
// ROUTE GET /api/v1/bootcamps/:id
// Access public
exports.getBootcamp = async (req, res, next) => {
  try {
    const response = await Bootcamp.findById(req.params.id);
    if (!Bootcamp) return res.status(400).json({ msg: 'Failure' });
    res.status(200).json({ msg: 'Sucess', data: response });
  } catch (err) {
    res.status(404).json({ msg: 'Failure' });
  }
};
// ROUTE DELETE /api/v1/bootcamps/:id
// Access private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const response = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!Bootcamp) return res.status(400).json({ msg: 'Failure' });
    res.status(200).json({ msg: 'Success', data: {} });
  } catch (err) {
    res.status(404).json({ msg: 'Failure' });
  }
};
// ROUTE PUT /api/v1/bootcamps/:id
// Access private
exports.createBootcamp = async (req, res, next) => {
  try {
    console.log(req.body);
    const response = await Bootcamp.create(req.body);
    res.status(201).json({
      msg: 'Success',
      data: response
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: 'Failure'
    });
  }
};
// ROUTE PUT /api/v1/bootcamps/:id
// Access private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const response = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!Bootcamp) return res.status(400).json({ msg: 'Failure' });
    res.status(200).json({ msg: 'Success', data: response });
  } catch (err) {
    res.status(404).json({ msg: 'Failure' });
  }
};
