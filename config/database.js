const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Dev:Dvq785LM01wjV942@recipe-book-db-69fd315b.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=recipe-book-db', {
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