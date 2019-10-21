const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const Bootcamp = require('./models/bootcamp');
const Courses = require('./models/course');

mongoose.connect(process.env.MONGO_KEY, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

// Import
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    // await Courses.create(courses);
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

// Delete
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Courses.deleteMany();
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') importData();
if (process.argv[2] === '-d') deleteData();
