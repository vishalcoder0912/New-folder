import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  studentImage: String,
  courseName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  reviewText: { type: String, required: true },
  companyName: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
