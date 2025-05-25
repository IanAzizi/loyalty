// routes/purchaseRoutes.js
const express = require('express');
const router = express.Router();
const {
  createPurchase,
  getAllPurchases,
  deleteAllPurchases,
  deletePurchaseById
} = require('../controllers/purchaseController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// ثبت خرید جدید با تصویر
router.post('/create', protect, upload.single('image'), createPurchase);

// دریافت لیست همه خریدها
router.get('/', protect, getAllPurchases);

// حذف همه خریدها
router.delete('/delete-all', protect, deleteAllPurchases);

// حذف خرید خاص با ID
router.delete('/delete/:id', protect, deletePurchaseById);

module.exports = router;
