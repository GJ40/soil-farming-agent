const express = require('express');
const { getAllUsers, registerUser, loginUser, deleteUser, refresh, logout, getUsers } = require('../controllers/userController');
const { adminAuth } = require('../middlewares/authMiddleware');
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.post('/login', loginUser);
router.post('/refresh', refresh);
router.post('/logout', logout);
// router.post('/adminLogin', loginAdmin);
router.get('/', verifyJWT, adminAuth, getAllUsers);
router.post('/getUsers', verifyJWT, adminAuth, getUsers);
router.post('/register', registerUser);
router.delete('/deleteUser',verifyJWT, adminAuth, deleteUser);

module.exports = router;