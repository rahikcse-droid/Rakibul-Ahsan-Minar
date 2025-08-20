import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  subtitle: string;
  cover: string;
  gradient: string;
  shadow: string;
  orderLink: string;
  isPublished: boolean;
  publishedDate: Date;
  description?: string;
  price?: number;
  isbn?: string;
  pages?: number;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
  },
  cover: {
    type: String,
    required: true,
  },
  gradient: {
    type: String,
    required: true,
    default: 'from-blue-400 to-blue-600',
  },
  shadow: {
    type: String,
    required: true,
    default: 'shadow-blue-200',
  },
  orderLink: {
    type: String,
    required: true,
    default: '#',
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  isbn: {
    type: String,
    trim: true,
  },
  pages: {
    type: Number,
    min: 1,
  },
  language: {
    type: String,
    default: 'Bengali',
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);