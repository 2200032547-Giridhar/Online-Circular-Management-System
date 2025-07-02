const express = require('express');
const router = express.Router();
const {
  getUserCounts,
  getCircularCount,
  getEventCount,
  testRoute,
} = require('../controllers/adminController');

router.get('/users/counts', getUserCounts);
router.get('/circulars/count', getCircularCount);
router.get('/events/count', getEventCount);
router.get('/test', testRoute);

module.exports = router;
