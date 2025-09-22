const express = require('express');
const Report = require('../models/Report');
const Department = require('../models/Department');
const Notification = require('../models/Notification');
const multer = require('multer');
const aws = require('aws-sdk');
const dotenv = require('dotenv');
const auth = require('../middleware/auth');

dotenv.config();
const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const upload = multer({ storage: multer.memoryStorage() });

// Submit Report
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const { category, description, location, priority } = req.body;
    let photoURL = '';

    if (req.file) {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${Date.now()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      };
      const data = await s3.upload(params).promise();
      photoURL = data.Location;
    }

    const report = new Report({
      category,
      description,
      location,
      photoURL,
      priority,
      submittedBy: req.user._id
    });
    await report.save();

    const dept = await Department.findOne({ responsibleIssues: category });
    if (dept) {
      report.assignedTo = dept._id;
      await report.save();
    }

    const notification = new Notification({
      user: report.submittedBy,
      type: 'Status Change',
      report: report._id,
      message: 'Report submitted successfully'
    });
    await notification.save();

    // Real-time notification to citizen
    const io = req.app.get('io');
    io.to(report.submittedBy.toString()).emit('notification', notification);

    res.json(report);
  } catch (err) {
    res.status(500).json({ msg: 'Error submitting report' });
  }
});

// Update Status (Admin)
router.put('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') return res.status(403).json({ msg: 'Admin access only' });
    const { status, comments } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status, comments },
      { new: true }
    );

    const notification = new Notification({
      user: report.submittedBy,
      type: 'Status Change',
      report: report._id,
      message: `Status updated to ${status}`
    });
    await notification.save();

    // Real-time update to citizen
    const io = req.app.get('io');
    io.to(report.submittedBy.toString()).emit('notification', notification);
    io.to(report.submittedBy.toString()).emit('reportUpdate', report);

    res.json(report);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating status' });
  }
});

// Other routes (e.g., get reports) remain the same

module.exports = router;