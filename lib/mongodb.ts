// lib\mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nrbnayon:chatters@cluster0.f6x2ow6.mongodb.net/Rahik?retryWrites=true&w=majority';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached!.conn) {
    console.log('Using existing MongoDB connection');
    return cached!.conn;
  }

  if (!cached!.promise) {
    console.log('Creating new MongoDB connection...');
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached!.conn = await cached!.promise;
    console.log('MongoDB connected successfully');
  } catch (e) {
    console.error('MongoDB connection failed:', e);
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default connectDB;