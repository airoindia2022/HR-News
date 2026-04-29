const mongoose = require('mongoose');
const News = require('./models/News');
require('dotenv').config();

const seedData = [
  {
    title: "Hindustan Radiance Digital Platform Launched",
    content: "We are proud to announce the launch of our new digital news platform...",
    category: "Corporate",
    author: "Editorial Team",
    excerpt: "Hindustan Radiance transitions to a modern digital-first news delivery system.",
    isBreaking: true
  },
  {
    title: "AI Revolution in Journalism",
    content: "How artificial intelligence is changing the way we consume and produce news...",
    category: "Technology",
    author: "Yazdani Hasan",
    excerpt: "Deep dive into the impact of AI on the future of media.",
    isEditorsChoice: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to seed database');
    
    await News.deleteMany({}); // Clear existing data
    await News.insertMany(seedData);
    
    console.log('Data Seeded Successfully');
    process.exit();
  } catch (err) {
    console.error('Seeding Error:', err);
    process.exit(1);
  }
};

seedDB();
