const jwt = require('jsonwebtoken');
const User = require('../models/User');  // مطمئن شوید که مسیر User درست است

const protect = async (req, res, next) => {
  let token;

  // بررسی هدر Authorization برای وجود توکن
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // استخراج توکن از هدر
      token = req.headers.authorization.split(' ')[1];

      // بررسی و تایید توکن
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // پیدا کردن کاربر بر اساس userId از توکن و اضافه کردن آن به درخواست
      req.user = await User.findById(decoded.userId).select('-password'); // حذف رمز عبور از اطلاعات کاربر

      next(); // ادامه اجرای روت
    } catch (error) {
      // اگر توکن منقضی شده یا نامعتبر باشد
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // اگر توکنی در هدر موجود نباشد
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
