const express = require('express');
const { adminAuth, userAuth } = require('../middlewares/authMiddleware');
const { getAllDistributors, getDistributors, getDistributor, addDistributor, updateDistributor, deleteDistributor } = require('../controllers/distributorController');
const verifyJWT = require('../middlewares/verifyJWT');


const router = express.Router();

router.use(verifyJWT);

router.get('/', userAuth, getAllDistributors);
router.get('/:id', userAuth, getDistributor);
router.post('/getDists', userAuth, getDistributors);
router.post('/addDist', adminAuth, addDistributor);
router.delete('/:id', adminAuth, deleteDistributor);
router.put('/:id', adminAuth, updateDistributor);


module.exports = router;