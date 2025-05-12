// routes/purchaseRoutes.js
const express = require('express');
const router = express.Router();
const { createPurchase, getAllPurchases } = require('../controllers/purchaseController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/create', protect, upload.single('image'), createPurchase);
router.get('/', protect, getAllPurchases);

module.exports = router;
