import mongoose from 'mongoose';
import { makeSlug } from '../utils/slug.js';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true, trim: true, index: true },
  featuredImage: String,
  category: { type: String, required: true },
  author: { type: String, required: true },
  shortExcerpt: { type: String, required: true },
  fullContent: { type: String, required: true },
  seoTitle: String,
  seoDescription: String,
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
  isVisible: { type: Boolean, default: true },
  publishedAt: Date
}, { timestamps: true });

blogSchema.pre('validate', function setSlug(next) {
  if (!this.slug && this.title) this.slug = makeSlug(this.title);
  if (this.slug) this.slug = makeSlug(this.slug);
  if (this.status === 'published' && !this.publishedAt) this.publishedAt = new Date();
  next();
});

export default mongoose.model('Blog', blogSchema);
