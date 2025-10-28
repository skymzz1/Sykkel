const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to add a new user
router.post('/add-user', adminController.addUser);

// Route to get all users (optional, for admin view)
router.get('/users', adminController.getUsers);

module.exports = router;