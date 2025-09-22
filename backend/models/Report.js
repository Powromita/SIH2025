const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  category: { type: String, enum: ['Pothole', 'Garbage', 'Streetlight', 'Drainage'], required: true },
  description: { type: String, required: true },
  location: { type: String, required: true }, // Update to GeoJSON later if needed
  photoURL: { type: String }, // S3 URL
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['Submitted', 'In Progress', 'Resolved'], default: 'Submitted' },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  comments: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

reportSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Report', reportSchema);