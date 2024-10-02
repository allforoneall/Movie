import mongoose from 'mongoose';
import app from './src/app';
import dotenv from 'dotenv'
dotenv.config();
const PORT = process.env.PORT || 27017;
//@ts-ignore
const MONGO_URI : string  = process.env.MONGO_URI
mongoose
//@ts-ignore
  .connect(MONGO_URI)  // No need for useNewUrlParser and useUnifiedTopology options
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
