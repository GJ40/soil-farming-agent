const express = require('express');
const { adminAuth } = require('../middlewares/authMiddleware');
const dashboard = require('../controllers/adminDashboardController');
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.get('/dashboard', verifyJWT, adminAuth, dashboard);

module.exports = router