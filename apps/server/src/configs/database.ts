import 'dotenv/config';
import mongoose from 'mongoose';

const { MONGO_URL } = process.env

export const connect = () => mongoose.connect(MONGO_URL)
  .then(() => console.log('🚀 Connect database successfully!'))
  .catch((error) => {
    console.log('🚀 Connect database failed');
    console.log(error);
  })