const mongoose = require('mongoose');

const epaperSchema = new mongoose.Schema({
  pdfData: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    unique: true // One paper per day
  },
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EPaper', epaperSchema);
