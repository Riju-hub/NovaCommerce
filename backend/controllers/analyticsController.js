import Order from '../models/Order.js';
import Store from '../models/Store.js';

export const getVendorAnalytics = async (req, res, next) => {
  try {
    const store = await Store.findOne({ vendor: req.user.id });
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    const salesData = await Order.aggregate([
      { $unwind: '$orderItems' },
      { $match: { 'orderItems.store': store._id, isPaid: true } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const analytics = salesData[0] || { totalRevenue: 0, totalOrders: 0 };

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};