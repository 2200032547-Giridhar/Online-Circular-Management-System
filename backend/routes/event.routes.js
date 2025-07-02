const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { verifyToken } = require('../middlewares/auth');

// Middleware: Allow only Admin or Faculty
const isAdminOrFaculty = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'faculty') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied.' });
  }
};

router.post('/create', verifyToken, isAdminOrFaculty, eventController.createEvent);
router.get('/my-events', verifyToken, isAdminOrFaculty, eventController.getUserEvents);
router.put('/:id', verifyToken, isAdminOrFaculty, eventController.updateEvent);
router.delete('/:id', verifyToken, isAdminOrFaculty, eventController.deleteEvent);

router.get('/', verifyToken, eventController.getEvents);
router.get('/:id', verifyToken, eventController.getEventById);

module.exports = router;
