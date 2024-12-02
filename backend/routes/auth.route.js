const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/Auth.js');
const { updateDoctorProfile, getAllDoctors } = require('../controllers/User.js');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/update-profile/:id', updateDoctorProfile);

module.exports = router;
