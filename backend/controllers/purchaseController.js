// controllers/purchaseController.js
const Purchase = require('../models/Purchase');

exports.createPurchase = async (req, res) => {
  const { amount } = req.body;
  const image = req.file?.filename;

  // اطمینان از اینکه مقدار amount و image وجود دارند
  if (!amount || !image) {
    return res.status(400).json({ message: 'لطفا عکس فاکتور خود را بارگزاری فرمایید' });
  }

  // محاسبه‌ی points (این می‌تواند به دلخواه تغییر کند)
  const points = Math.floor(amount / 1000); // مثلاً به ازای هر 1000 تومان یک امتیاز

  try {
    // ایجاد یک سند جدید Purchase
    const newPurchase = new Purchase({
      user: req.user._id, // از داده‌های user که در protect ذخیره شده استفاده می‌کنیم
      amount,
      image,
      points, // ذخیره points
    });

    // ذخیره خرید در دیتابیس
    await newPurchase.save();

    // بازگشت نتیجه
    res.status(201).json({
      message: 'خرید شما با موفقیت ثبت شد',
      purchase: newPurchase,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'ارور سرور', error: err });
  }
};
