import User from '../models/User.js';
import Store from '../models/Store.js';
import Product from '../models/Product.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

export const getVendorStores = async (req, res, next) => {
  try {
    const stores = await Store.find().populate('vendor', 'name email');
    res.status(200).json({ success: true, count: stores.length, data: stores });
  } catch (error) {
    next(error);
  }
};

export const updateVendorStatus = async (req, res, next) => {
  try {
    const { status } = req.body; 
    const store = await Store.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }

    res.status(200).json({ success: true, data: store });
  } catch (error) {
    next(error);
  }
};

export const getPendingProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ approvalStatus: 'pending' })
      .populate('store', 'name slug logo')
      .populate('category', 'name')
      .sort('-createdAt');

    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

export const updateProductApproval = async (req, res, next) => {
  try {
    const { status, rejectionReason } = req.body; // status: 'approved' or 'rejected'

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const isPublished = status === 'approved';

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        approvalStatus: status,
        isPublished: isPublished,
        rejectionReason: status === 'rejected' ? rejectionReason || 'Does not meet platform rules.' : '',
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: `Product ${status} successfully`,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};