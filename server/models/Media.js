import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  title: String,
  url: { type: String, required: true },
  fileId: String,
  fileName: String,
  mimeType: String,
  size: Number,
  width: Number,
  height: Number,
  provider: { type: String, default: 'imagekit' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' }
}, { timestamps: true });

export default mongoose.model('Media', mediaSchema);
