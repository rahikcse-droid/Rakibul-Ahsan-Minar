import mongoose, { Document, Schema } from 'mongoose';

export interface ISinger extends Document {
  name: string;
  image: string;
  bio?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SingerSchema = new Schema<ISinger>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Singer || mongoose.model<ISinger>('Singer', SingerSchema);