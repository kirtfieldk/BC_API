const app = require('express')();
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} on ${PORT}`)
);
