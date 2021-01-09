const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const sanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const hpp = require('hpp');
const mongoDb = require('./config/db');
dotenv.config({ path: './config/config.env' });
const routes = require('./routes/routes');
const courseRoutes = require('./routes/courses');
const authROute = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/review');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
app.use(express.json());
app.use(cookieParser());
app.use(sanitize());
app.use(helmet());
app.use(cors());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});
app.use(limiter);
app.use(hpp());
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));
mongoDb();

require('./models/bootcamp');
require('./models/course');
app.use(fileUpload());
// Set Static foldure
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v1/bootcamps', routes);
app.use('/v1/courses', courseRoutes);
app.use('/v1/auth', authROute);
app.use('/v1/admin', adminRoutes);
app.use('/v1/reviews', reviewRoutes);
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
