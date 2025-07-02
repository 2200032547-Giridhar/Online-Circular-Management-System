const express = require('express');
const router = express.Router();
const circularController = require('../controllers/circular.controller');
const upload = require('../middlewares/upload');
const { verifyToken, isAdmin, isFaculty, isStudent } = require('../middlewares/auth');

// ========================
// Admin Routes
// ========================

// Create a new circular (Admin only)
router.post(
  '/admin/create',
  verifyToken,
  isAdmin,
  upload.single('attachment'),
  circularController.createCircular
);

// Update circular status or fields (Admin only)
router.put(
  '/admin/update/:id',
  verifyToken,
  isAdmin,
  circularController.updateCircularStatus
);

// Approve or reject faculty-submitted circular (Admin only)
router.put(
  '/admin/approve/:id',
  verifyToken,
  isAdmin,
  circularController.approveCircular
);

// Delete a circular (Admin only)
router.delete(
  '/admin/delete/:id',
  verifyToken,
  isAdmin,
  circularController.deleteCircular
);

// Get all circulars (Admin overview)
router.get(
  '/all',
  verifyToken,
  circularController.getAllCirculars
);

// ========================
// Faculty Routes
// ========================

// Submit a circular draft (Faculty only)
router.post(
  '/faculty/submit',
  verifyToken,
  isFaculty,
  upload.single('attachment'),
  circularController.submitCircular
);

// View circulars created by the logged-in faculty
router.get(
  '/faculty/mine',
  verifyToken,
  isFaculty,
  circularController.getFacultyCirculars
);

// Track status of submitted circulars (Faculty only)
router.get(
  '/faculty/status',
  verifyToken,
  isFaculty,
  circularController.trackStatus
);

// ========================
// Student Routes
// ========================

// View circulars available to students (Student only)
router.get(
  '/student',
  verifyToken,
  isStudent,
  circularController.getStudentCirculars
);

// ========================
// Shared Routes
// ========================

// Search/filter circulars by department, date, reference ID, etc. (Any authenticated user)
router.get(
  '/search',
  verifyToken,
  circularController.searchCirculars
);

// Get circular by ID (for preview or download) (Any authenticated user)
router.get(
  '/:id',
  verifyToken,
  circularController.getCircularById
);


module.exports = router;
