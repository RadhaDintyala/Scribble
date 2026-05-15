const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPinned: { type: Boolean, default: false },
  color: { type: String, default: '#ffffff' },
  tags: [{ type: String }],
  audioUrl: { type: String, default: null }, // Store base64 or URL
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
