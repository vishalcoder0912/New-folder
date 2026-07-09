import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  interestedCourse: String,
  message: String,
  sourcePage: String,
  status: { type: String, enum: ['pending', 'contacted', 'converted'], default: 'pending', index: true }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
