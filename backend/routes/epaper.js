const express = require('express');
const router = express.Router();
const EPaper = require('../models/EPaper');
const auth = require('../middleware/auth');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Store in memory instead of disk
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // Limit to 15MB for MongoDB doc limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDFs are allowed'), false);
    }
  }
});

// Ensure cache directory exists for fast E-paper loading
const cacheDir = path.join(__dirname, '../cache/epaper');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

const getCachePath = (id) => path.join(cacheDir, `${id}.pdf`);

// @route   GET api/epaper/latest
// @desc    Get the latest e-paper info (without binary data)
router.get('/latest', async (req, res) => {
  try {
    const latest = await EPaper.findOne().sort({ date: -1 }).select('-pdfData');
    res.json(latest);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/epaper
// @desc    Get all e-papers (without binary data, sorted by date desc)
router.get('/', async (req, res) => {
  try {
    const papers = await EPaper.find().sort({ date: -1 }).select('-pdfData');
    res.json(papers);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/epaper/view/:id
// @desc    View/Download the PDF from database (caches locally for performance)
router.get('/view/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cachePath = getCachePath(id);

    // If cached locally, serve immediately
    if (fs.existsSync(cachePath)) {
      res.set('Content-Type', 'application/pdf');
      return res.sendFile(cachePath);
    }

    const paper = await EPaper.findById(id);
    if (!paper) return res.status(404).json({ msg: 'E-paper not found' });

    // Write to cache asynchronously so we don't block the response
    fs.writeFile(cachePath, paper.pdfData, (err) => {
      if (err) console.error('Error writing epaper cache:', err);
    });

    res.set('Content-Type', paper.contentType || 'application/pdf');
    res.send(paper.pdfData);
  } catch (err) {
    console.error('EPaper View Error:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST api/epaper
// @desc    Upload a new e-paper to database
router.post('/', [auth, upload.single('pdf')], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'Please upload a PDF file' });
    }

    const { title, date } = req.body;
    let paperDate;
    if (date) {
      paperDate = new Date(date);
    } else {
      paperDate = new Date();
    }
    paperDate.setHours(0, 0, 0, 0);

    const newPaper = {
      pdfData: req.file.buffer,
      contentType: req.file.mimetype,
      title: title || `Hindustan Radiance - ${paperDate.toLocaleDateString()}`,
      date: paperDate
    };

    // Replace today's paper if it exists
    let paper = await EPaper.findOne({ date: paperDate });
    if (paper) {
      paper.pdfData = newPaper.pdfData;
      paper.contentType = newPaper.contentType;
      paper.title = newPaper.title;
      await paper.save();
    } else {
      paper = new EPaper(newPaper);
      await paper.save();
    }

    // Cache the uploaded PDF to disk immediately so the first view is instant
    const cachePath = getCachePath(paper._id);
    fs.writeFile(cachePath, req.file.buffer, (err) => {
      if (err) console.error('Error writing uploaded epaper to cache:', err);
    });

    res.json({ msg: 'E-paper saved to database', id: paper._id });
  } catch (err) {
    console.error('EPaper Upload Error:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// @route   DELETE api/epaper/:id
// @desc    Delete an e-paper
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const paper = await EPaper.findById(id);
    if (!paper) return res.status(404).json({ msg: 'E-paper not found' });

    await paper.deleteOne();

    // Delete local cached file if it exists
    const cachePath = getCachePath(id);
    if (fs.existsSync(cachePath)) {
      fs.unlink(cachePath, (err) => {
        if (err) console.error('Error deleting cached epaper:', err);
      });
    }

    res.json({ msg: 'E-paper removed' });
  } catch (err) {
    console.error('EPaper Delete Error:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
