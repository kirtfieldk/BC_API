const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
dotenv.config({ path: './config/config.env' });
const routes = require('./routes/routes');
const courseRoutes = require('./routes/courses');
const authROute = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/review');
const morgan = require('morgan');
const mongoDb = require('./config/db');
const errorHandler = require('./middleware/error');

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));
mongoDb();

require('./models/bootcamp');
require('./models/course');
app.use(fileUpload());
// Set Static foldure
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/bootcamps', routes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/auth', authROute);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} on ${PORT}`)
);

// Handle promise rejection
process.on('unhandlesRejection', (err, promise) => {
  console.log(`err: ${err.message}`);
  server.close(() => process.exit(1));
});
