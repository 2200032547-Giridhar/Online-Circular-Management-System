const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Admin-only routes
router.get('/', verifyToken, isAdmin, userController.getUsers);
router.get('/:id', verifyToken, isAdmin, userController.getUserById);
router.put('/:id', verifyToken, isAdmin, userController.updateUser);
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

module.exports = router;