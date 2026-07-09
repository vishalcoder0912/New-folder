import mongoose from 'mongoose';
import { makeSlug } from '../utils/slug.js';

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [String]
}, { _id: true });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true, trim: true, index: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  category: { type: String, required: true, index: true },
  duration: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  price: { type: Number, default: 0 },
  discountPrice: { type: Number, default: 0 },
  imageUrl: String,
  curriculumModules: [moduleSchema],
  skillsCovered: [String],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true }
}, { timestamps: true });

courseSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = makeSlug(this.title);
  if (this.slug) this.slug = makeSlug(this.slug);
  next();
});

export default mongoose.model('Course', courseSchema);
