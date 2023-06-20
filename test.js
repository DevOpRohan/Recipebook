const connectDB = require('./config/database');

async function test() {
  try {
    await connectDB();
    console.log('Connection successful!');
  } catch (err) {
    console.error(err.message);
  }
}

test();