const express = require('express');
const router = express.Router();
const { createPurchase } = require('../controllers/purchaseController'); // ✅ make sure this is correct
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // ✅ multer instance

router.post('/create', protect, upload.single('image'), createPurchase);
console.log('protect:', typeof protect);
console.log('upload.single:', typeof upload.single);
console.log('createPurchase:', typeof createPurchase);

module.exports = router;
