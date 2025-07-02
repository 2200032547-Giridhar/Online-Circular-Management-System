const Circular = require('../models/Circular');

// Helper to normalize targetAudience as lowercase array
function normalizeAudience(targetAudience) {
  if (Array.isArray(targetAudience)) {
    return targetAudience.map(a => a.toLowerCase()).sort();
  }
  return [targetAudience.toLowerCase()];
}

// Create a new circular (Admin)
const createCircular = async (req, res) => {
  try {
    const {
      title,
      type,
      department,
      targetAudience,
      issueDate,
      receiveDate,
      referenceId,
    } = req.body;

    if (!title || !type || !department || !targetAudience || !issueDate || !referenceId) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Check if referenceId is unique
    const existingCircular = await Circular.findOne({ referenceId });
    if (existingCircular) {
      return res.status(400).json({ message: 'Reference ID must be unique.' });
    }

    const attachmentUrl = req.file ? req.file.path : undefined;

    const audience = normalizeAudience(targetAudience);

    const circular = new Circular({
      title,
      type,
      issuedBy: req.user.id,
      department,
      targetAudience: audience,
      status: 'pending',
      issueDate,
      receiveDate,
      referenceId,
      attachmentUrl,
    });

    await circular.save();

    res.status(201).json(circular);
  } catch (error) {
    console.error('Error creating circular:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all circulars (with optional filters)
const getAllCirculars = async (req, res) => {
  try {
    const { department, date, referenceId, type, status } = req.query;

    let filter = {};

    if (department) filter.department = department;
    if (referenceId) filter.referenceId = referenceId;
    if (type) filter.type = type;
    if (status) filter.status = status;

    if (date) {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      filter.issueDate = { $gte: dayStart, $lte: dayEnd };
    }

    const circulars = await Circular.find(filter)
      .populate('issuedBy', 'name email role')
      .lean();

    res.json(circulars);
  } catch (error) {
    console.error('Error fetching circulars:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get circular by ID
const getCircularById = async (req, res) => {
  try {
    const circular = await Circular.findById(req.params.id)
      .populate('issuedBy', 'name email role')
      .lean();
    if (!circular) return res.status(404).json({ message: 'Circular not found' });
    res.json(circular);
  } catch (error) {
    console.error('Error fetching circular:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve or reject circular submitted by faculty (Admin)
const approveCircular = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const circular = await Circular.findById(req.params.id);
    if (!circular) return res.status(404).json({ message: 'Circular not found' });

    circular.status = status;
    await circular.save();

    res.json({ message: `Circular ${status} successfully`, circular });
  } catch (error) {
    console.error('Error updating circular status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete circular by ID (Admin)
const deleteCircular = async (req, res) => {
  try {
    const circular = await Circular.findByIdAndDelete(req.params.id);
    if (!circular) return res.status(404).json({ message: 'Circular not found' });
    res.json({ message: 'Circular deleted successfully' });
  } catch (error) {
    console.error('Error deleting circular:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Faculty submits a circular draft
const submitCircular = async (req, res) => {
  try {
    const {
      title,
      type,
      department,
      targetAudience,
      issueDate,
      receiveDate,
      referenceId,
    } = req.body;

    if (!title || !type || !department || !targetAudience || !issueDate || !referenceId) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const attachmentUrl = req.file ? req.file.path : undefined;

    const audience = normalizeAudience(targetAudience);

    const circular = new Circular({
      title,
      type,
      issuedBy: req.user.id,
      department,
      targetAudience: audience,
      status: 'submitted',
      issueDate,
      receiveDate,
      referenceId,
      attachmentUrl,
    });

    await circular.save();

    res.status(201).json(circular);
  } catch (error) {
    console.error('Error submitting circular:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get circulars created by faculty
const getFacultyCirculars = async (req, res) => {
  try {
    const circulars = await Circular.find({ issuedBy: req.user.id }).lean();
    res.json(circulars);
  } catch (error) {
    console.error('Error fetching faculty circulars:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Track status of submitted circulars by faculty
const trackStatus = async (req, res) => {
  try {
    const circulars = await Circular.find({ issuedBy: req.user.id }).select('title status').lean();
    res.json(circulars);
  } catch (error) {
    console.error('Error tracking status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get circulars for students (based on targetAudience, status = approved)
const getStudentCirculars = async (req, res) => {
  try {
    // Assuming targetAudience is stored as an array of lowercase strings
    const circulars = await Circular.find({
      targetAudience: { $in: ['student', 'facultystudent', 'all'] },
      status: 'approved',
    }).lean();
    res.json(circulars);
  } catch (error) {
    console.error('Error fetching student circulars:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search circulars (admin and shared route)
const searchCirculars = async (req, res) => {
  try {
    const { department, date, referenceId, type, status } = req.query;

    let filter = {};

    if (department) filter.department = department;
    if (referenceId) filter.referenceId = referenceId;
    if (type) filter.type = type;
    if (status) filter.status = status;

    if (date) {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      filter.issueDate = { $gte: dayStart, $lte: dayEnd };
    }

    const circulars = await Circular.find(filter).populate('issuedBy', 'name email role').lean();

    res.json(circulars);
  } catch (error) {
    console.error('Error searching circulars:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update circular status or other fields (Admin)
const updateCircularStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required.' });
    }

    const updated = await Circular.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({ message: 'Circular not found' });
    }

    res.json({ message: 'Status updated', circular: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  updateCircularStatus,
  createCircular,
  getAllCirculars,
  getCircularById,
  approveCircular,
  deleteCircular,
  submitCircular,
  getFacultyCirculars,
  trackStatus,
  getStudentCirculars,
  searchCirculars,
};
