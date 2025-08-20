import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  reply?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  isReplied: {
    type: Boolean,
    default: false,
  },
  reply: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);