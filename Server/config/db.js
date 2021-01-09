const mongoose = require('mongoose');

const connectdb = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`mongodb connected: ${connect.connection.host}`);
};
module.exports = connectdb;
