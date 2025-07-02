const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['incoming', 'outgoing'],
    required: true
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  targetAudience: {
    type: [String],
    enum: ['faculty', 'student'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'published'],
    default: 'pending'
  },
  issueDate: {
    type: Date,
    required: true
  },
  receiveDate: {
    type: Date
  },
  referenceId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  attachmentUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Circular', circularSchema);
