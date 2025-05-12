const express = require('express');
const router = express.Router();
const { signup, login, getUserById } = require('../controllers/userController'); // اطمینان از اینکه متدهای لازم وارد شده‌اند
const { protect } = require('../middleware/authMiddleware'); // وارد کردن protect از authMiddleware

// روت ثبت‌نام
router.post('/signup', signup);

// روت ورود
router.post('/login', login);

// روت گرفتن اطلاعات کاربر
router.get('/:id', protect, getUserById); // استفاده از protect برای حفاظت از روت

module.exports = router;
