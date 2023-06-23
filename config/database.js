const mongoose = require('mongoose');
const DB_CONN = process.env.DB_CONN;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;