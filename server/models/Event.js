import mongoose from 'mongoose';
import { makeSlug } from '../utils/slug.js';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true, trim: true, index: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: String,
  location: String,
  onlineLink: String,
  imageUrl: String,
  registrationLink: String,
  status: { type: String, enum: ['upcoming', 'completed', 'draft'], default: 'draft', index: true },
  featured: { type: Boolean, default: false },
  isVisible: { type: Boolean, default: true }
}, { timestamps: true });

eventSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = makeSlug(this.title);
  if (this.slug) this.slug = makeSlug(this.slug);
  next();
});

export default mongoose.model('Event', eventSchema);
