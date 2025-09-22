const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., 'Roads', 'Sanitation'
  responsibleIssues: [{ type: String }] // e.g., ['Pothole']
});

module.exports = mongoose.model('Department', departmentSchema);