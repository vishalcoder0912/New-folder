import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  designation: { type: String, required: true },
  imageUrl: String,
  bio: { type: String, required: true },
  experience: String,
  skills: [String],
  linkedInUrl: String,
  isActive: { type: Boolean, default: true, index: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Mentor', mentorSchema);
