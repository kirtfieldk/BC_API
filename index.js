const express = require('express');

const app = express();
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const morgan = require('morgan');
const mongoDb = require('./config/db');
dotenv.config({ path: './config/config.env' });
app.use(express.json());
if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));
mongoDb();
require('./models/bootcamp');
app.use('/api/v1/bootcamps', routes);
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
