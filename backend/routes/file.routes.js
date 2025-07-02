const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const upload = require('../middlewares/upload');
const { verifyToken } = require('../middlewares/auth'); // Your auth middleware

// Upload a file
router.post('/upload', verifyToken, upload.single('file'), fileController.uploadFile);

// Download a file by filename (optional)
router.get('/download/:filename', verifyToken, fileController.downloadFile);

module.exports = router;    