// controllers/purchaseController.js
const Purchase = require('../models/Purchase');

exports.createPurchase = async (req, res) => {
  const { amount, storeName } = req.body;
  const image = req.file?.filename;

  if (!amount || !storeName || !image) {
    return res.status(400).json({ message: 'لطفا تمام فیلدها از جمله نام فروشگاه و عکس فاکتور را وارد کنید' });
  }

  const points = Math.floor(amount / 1000);

  try {
    const newPurchase = new Purchase({
      user: req.user._id,
      amount,
      storeName,
      image,
      points,
    });

    await newPurchase.save();

    res.status(201).json({
      message: 'خرید با موفقیت ثبت شد',
      purchase: newPurchase,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'خطای سرور', error: err.message });
  }
};
// controllers/purchaseController.js

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate('user', 'name phone') // اینجا نام و شماره تماس رو از user می‌گیریم
      .lean();

    const fullPurchases = purchases.map(p => ({
      ...p,
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/${p.image}`,
    }));

    res.json(fullPurchases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllPurchases = async (req, res) => {
    try {
      const purchases = await Purchase.find()
        .populate('user', 'name phone')
        .lean();
  
      const fullPurchases = purchases.map(p => ({
        ...p,
        imageUrl: `${req.protocol}://${req.get('host')}/uploads/${p.image}`,
      }));
  
      res.json(fullPurchases);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  // حذف همه خریدها
exports.deleteAllPurchases = async (req, res) => {
    try {
      await Purchase.deleteMany({});
      res.json({ message: 'همه خریدها با موفقیت حذف شدند' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطای سرور در حذف همه خریدها', error: err.message });
    }
  };
  
  // حذف خرید بر اساس ID
  exports.deletePurchaseById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPurchase = await Purchase.findByIdAndDelete(id);
      if (!deletedPurchase) {
        return res.status(404).json({ message: 'خرید موردنظر پیدا نشد' });
      }
      res.json({ message: 'خرید با موفقیت حذف شد' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطای سرور در حذف خرید', error: err.message });
    }
  };
  
  
  
