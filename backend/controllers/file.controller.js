const path = require('path');
const fs = require('fs');

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileInfo = {
    filename: req.file.filename,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    url: `/uploads/${req.file.filename}`
  };

  res.status(201).json({ message: 'File uploaded successfully', file: fileInfo });
};

const downloadFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', filename);

  fs.access(filePath, fs.constants.F_OK, err => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.download(filePath, filename, err => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  });
};

module.exports = {
  uploadFile,
  downloadFile,
};
