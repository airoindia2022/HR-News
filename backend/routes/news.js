const express = require('express');
const router = express.Router();
const News = require('../models/News');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// @route   GET api/news
// @desc    Get news items (defaults to last 24 hours)
router.get('/', async (req, res) => {
  try {
    const showAll = req.query.all === 'true';
    let query = {};
    
    if (!showAll) {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      query.date = { $gte: twentyFourHoursAgo };
    }

    const news = await News.find(query).sort({ date: -1 });
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/news/breaking
// @desc    Get breaking news items (last 24 hours)
router.get('/breaking', async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const breakingNews = await News.find({ 
      isBreaking: true,
      date: { $gte: twentyFourHoursAgo }
    }).sort({ date: -1 });
    res.json(breakingNews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/news
// @desc    Create a news item
router.post('/', [auth, upload.single('image')], async (req, res) => {
  const { title, content, category, author, excerpt, link, isBreaking, isEditorsChoice } = req.body;

  try {
    let imageUrl = req.body.imageUrl; // Option to send a URL directly if needed
    
    if (req.file) {
      imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const newsData = {
      title,
      content,
      category,
      author: author || 'Hindustan Radiance Editorial',
      excerpt,
      link,
      isBreaking: isBreaking === 'true' || isBreaking === true,
      isEditorsChoice: isEditorsChoice === 'true' || isEditorsChoice === true
    };

    if (imageUrl) {
      newsData.image = imageUrl;
    }

    const newNews = new News(newsData);

    const savedNews = await newNews.save();
    res.json(savedNews);
  } catch (err) {
    console.error('Publish Error Details:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// @route   DELETE api/news/:id
// @desc    Delete a news item
router.delete('/:id', auth, async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ msg: 'News item not found' });

    await newsItem.deleteOne();
    res.json({ msg: 'News item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
