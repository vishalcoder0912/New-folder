import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  icon: String,
  link: String
}, { _id: true });

const pageSectionSchema = new mongoose.Schema({
  pageName: { type: String, required: true, lowercase: true, trim: true, index: true },
  sectionType: {
    type: String,
    required: true,
    enum: ['hero', 'textImage', 'courseGrid', 'featureCards', 'statistics', 'testimonials', 'faq', 'cta', 'eventGrid', 'mentorGrid', 'customContent']
  },
  title: { type: String, required: true, trim: true },
  subtitle: String,
  description: String,
  imageUrl: String,
  buttonText: String,
  buttonLink: String,
  layoutType: { type: String, default: 'default' },
  backgroundColor: { type: String, default: '#ffffff' },
  textColor: { type: String, default: '#111827' },
  order: { type: Number, default: 0, index: true },
  isVisible: { type: Boolean, default: true },
  cards: [cardSchema]
}, { timestamps: true });

pageSectionSchema.index({ pageName: 1, order: 1 });

export default mongoose.model('PageSection', pageSectionSchema);
