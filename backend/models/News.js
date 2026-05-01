const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    index: true
  },
  author: { 
    type: String, 
    required: false,
    default: 'Hindustan Radiance Editorial'
  },
  image: { 
    type: String,
    default: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800'
  },
  imageData: Buffer,
  imageContentType: String,
  video: {
    type: String
  },
  videoData: Buffer,
  videoContentType: String,
  date: { 
    type: Date, 
    default: Date.now 
  },
  excerpt: { 
    type: String,
    trim: true
  },
  link: { 
    type: String 
  },
  isBreaking: {
    type: Boolean,
    default: false
  },
  isEditorsChoice: {
    type: Boolean,
    default: false
  },
  newsCategory: {
    type: String,
    default: 'General'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('News', newsSchema);
