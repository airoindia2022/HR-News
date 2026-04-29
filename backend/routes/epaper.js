const express = require('express');
const router = express.Router();
const EPaper = require('../models/EPaper');
const auth = require('../middleware/auth');
const multer = require('multer');

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

// @route   GET api/epaper/view/:id
// @desc    View/Download the PDF from database
router.get('/view/:id', async (req, res) => {
  try {
    const paper = await EPaper.findById(req.params.id);
    if (!paper) return res.status(404).json({ msg: 'E-paper not found' });

    res.set('Content-Type', paper.contentType);
    res.send(paper.pdfData);
  } catch (err) {
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

    const { title } = req.body;
    const date = new Date().setHours(0,0,0,0);

    const newPaper = {
      pdfData: req.file.buffer,
      contentType: req.file.mimetype,
      title: title || `Hindustan Radiance - ${new Date().toLocaleDateString()}`,
      date
    };

    // Replace today's paper if it exists
    let paper = await EPaper.findOne({ date });
    if (paper) {
      paper.pdfData = newPaper.pdfData;
      paper.contentType = newPaper.contentType;
      paper.title = newPaper.title;
      await paper.save();
    } else {
      paper = new EPaper(newPaper);
      await paper.save();
    }

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
    const paper = await EPaper.findById(req.params.id);
    if (!paper) return res.status(404).json({ msg: 'E-paper not found' });

    await paper.deleteOne();
    res.json({ msg: 'E-paper removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
