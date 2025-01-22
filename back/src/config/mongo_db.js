const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    connectDB();
  }
};
const checkDBConnectionMW = (req, res, next) => {
  const dbState = mongoose.connection.readyState;
  if (dbState === 1) {
    return next();
  }
  res.status(503).send({
    error: 'Database is not connected. Please try again later.',
  });
};

module.exports = { connectDB, checkDBConnectionMW };