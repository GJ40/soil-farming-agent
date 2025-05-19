const express = require('express');
const { adminAuth, userAuth } = require('../middlewares/authMiddleware');
const { getAllSoils, getSoils, addSoil, deleteSoil, updateSoil, getSoil } = require('../controllers/soilController');
const verifyJWT = require('../middlewares/verifyJWT');


const router = express.Router();

router.use(verifyJWT);

router.get('/', userAuth, getAllSoils);
router.get('/:id', userAuth, getSoil);
router.post('/getSoils', userAuth, getSoils);
router.post('/addSoil', adminAuth, addSoil);
router.delete('/:id', adminAuth, deleteSoil);
router.put('/:id', adminAuth, updateSoil);


module.exports = router;