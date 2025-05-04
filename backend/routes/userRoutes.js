const express = require('express');
const { getAllUsers, registerUser, loginUser, deleteUser, loginAdmin } = require('../controllers/userController');
const { adminAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.post('/adminLogin', loginAdmin);
router.get('/', adminAuth, getAllUsers);
router.post('/register', registerUser);
router.post('/deleteUser', adminAuth, deleteUser);

module.exports = router;