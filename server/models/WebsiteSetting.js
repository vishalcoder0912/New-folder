import mongoose from 'mongoose';

const navLinkSchema = new mongoose.Schema({
  label: String,
  href: String,
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true }
}, { _id: true });

const websiteSettingSchema = new mongoose.Schema({
  siteName: { type: String, default: 'EduNova' },
  logoUrl: String,
  faviconUrl: String,
  contactEmail: String,
  contactPhone: String,
  address: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    linkedin: String,
    youtube: String
  },
  navLinks: [navLinkSchema],
  ctaText: { type: String, default: 'Book Consultation' },
  ctaLink: { type: String, default: '/contact' },
  footerText: String
}, { timestamps: true });

export default mongoose.model('WebsiteSetting', websiteSettingSchema);
