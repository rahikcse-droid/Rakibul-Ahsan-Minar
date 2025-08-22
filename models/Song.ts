import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  singerId?: string;
  link: string;
  category: 'nasheed' | 'protest' | 'spiritual' | 'other';
  isPublished: boolean;
  publishedDate: Date;
  duration?: string;
  description?: string;
  lyrics?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SongSchema = new Schema<ISong>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
  },
  singerId: {
    type: Schema.Types.ObjectId,
    ref: 'Singer',
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['nasheed', 'protest', 'spiritual', 'other'],
    default: 'nasheed',
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  lyrics: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Song || mongoose.model<ISong>('Song', SongSchema);