const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const Bootcamp = require('./models/bootcamp');
const Courses = require('./models/course');
const User = require('./models/user');
const Reviews = require('./models/reviews');
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
const user = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);
const review = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
);

// Import
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Courses.create(courses);
    await User.create(user);
    await Reviews.create(review);
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
    await User.deleteMany();
    await Reviews.deleteMany();
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') importData();
if (process.argv[2] === '-d') deleteData();
