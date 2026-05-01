const express = require('express');
const router = express.Router();
const News = require('../models/News');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer Storage Configuration - Use Memory Storage for DB storage
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit for MongoDB document
});

// Multi-field upload configuration
const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]);

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

    const news = await News.find(query)
      .sort({ date: -1 })
      .select('-imageData -videoData'); // Don't send binary data in list
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/news/image/:id
// @desc    Get image from DB
router.get('/image/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem || !newsItem.imageData) return res.status(404).send('Image not found');
    res.set('Content-Type', newsItem.imageContentType);
    res.send(newsItem.imageData);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/news/video/:id
// @desc    Get video from DB
router.get('/video/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem || !newsItem.videoData) return res.status(404).send('Video not found');
    res.set('Content-Type', newsItem.videoContentType);
    res.send(newsItem.videoData);
  } catch (err) {
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
router.post('/', [auth, cpUpload], async (req, res) => {
  const { title, content, category, author, excerpt, link, isBreaking, isEditorsChoice, newsCategory, imageUrl, videoUrl } = req.body;

  try {
    let finalImageUrl = imageUrl;
    let finalVideoUrl = videoUrl;
    let imageData = null;
    let imageContentType = null;
    let videoData = null;
    let videoContentType = null;
    
    if (req.files) {
      if (req.files['image']) {
        imageData = req.files['image'][0].buffer;
        imageContentType = req.files['image'][0].mimetype;
      }
      if (req.files['video']) {
        videoData = req.files['video'][0].buffer;
        videoContentType = req.files['video'][0].mimetype;
      }
    }

    const newsData = {
      title,
      content,
      category,
      author: author || 'Hindustan Radiance Editorial',
      excerpt,
      link,
      isBreaking: isBreaking === 'true' || isBreaking === true,
      isEditorsChoice: isEditorsChoice === 'true' || isEditorsChoice === true,
      newsCategory: newsCategory || 'General',
      image: finalImageUrl,
      video: finalVideoUrl,
      imageData,
      imageContentType,
      videoData,
      videoContentType
    };

    const newNews = new News(newsData);
    const savedNews = await newNews.save();

    // After saving, if we have binary data, update the URL to point to our serving route
    if (imageData) {
      savedNews.image = `/api/news/image/${savedNews._id}`;
    }
    if (videoData) {
      savedNews.video = `/api/news/video/${savedNews._id}`;
    }
    await savedNews.save();

    res.json(savedNews);
  } catch (err) {
    console.error('Publish Error Details:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// @route   PUT api/news/:id
// @desc    Update a news item
router.put('/:id', [auth, cpUpload], async (req, res) => {
  const { title, content, category, author, excerpt, link, isBreaking, isEditorsChoice, newsCategory, imageUrl, videoUrl } = req.body;

  try {
    let newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ msg: 'News item not found' });

    let finalImageUrl = imageUrl || newsItem.image;
    let finalVideoUrl = videoUrl || newsItem.video;
    
    if (req.files) {
      if (req.files['image']) {
        newsItem.imageData = req.files['image'][0].buffer;
        newsItem.imageContentType = req.files['image'][0].mimetype;
        finalImageUrl = `/api/news/image/${newsItem._id}`;
      }
      if (req.files['video']) {
        newsItem.videoData = req.files['video'][0].buffer;
        newsItem.videoContentType = req.files['video'][0].mimetype;
        finalVideoUrl = `/api/news/video/${newsItem._id}`;
      }
    }

    const updatedData = {
      title: title || newsItem.title,
      content: content || newsItem.content,
      category: category || newsItem.category,
      author: author || newsItem.author,
      excerpt: excerpt || newsItem.excerpt,
      link: link || newsItem.link,
      isBreaking: isBreaking !== undefined ? (isBreaking === 'true' || isBreaking === true) : newsItem.isBreaking,
      isEditorsChoice: isEditorsChoice !== undefined ? (isEditorsChoice === 'true' || isEditorsChoice === true) : newsItem.isEditorsChoice,
      newsCategory: newsCategory || newsItem.newsCategory,
      image: finalImageUrl,
      video: finalVideoUrl,
      imageData: newsItem.imageData,
      imageContentType: newsItem.imageContentType,
      videoData: newsItem.videoData,
      videoContentType: newsItem.videoContentType
    };

    newsItem = await News.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    res.json(newsItem);
  } catch (err) {
    console.error('Update Error Details:', err);
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
