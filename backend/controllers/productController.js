import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Store from '../models/Store.js';
import APIFeatures from '../utils/apiFeatures.js';
import cloudinary from '../config/cloudinary.js';

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'ecommerce_products',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const getProducts = async (req, res, next) => {
  try {
    const resPerPage = 12;
    const queryParams = { ...req.query };

    if (queryParams.category && !mongoose.Types.ObjectId.isValid(queryParams.category)) {
      const categoryDoc = await Category.findOne({
        name: { $regex: `^${queryParams.category}$`, $options: 'i' },
      });

      if (categoryDoc) {
        queryParams.category = categoryDoc._id;
      } else {
        return res.status(200).json({
          success: true,
          count: 0,
          productsCount: 0,
          resPerPage,
          data: [],
        });
      }
    }

    const filterCondition = {
      isPublished: true,
      $or: [
        { approvalStatus: 'approved' },
        { approvalStatus: { $exists: false } } // Handles legacy products created before approval system
      ]
    };
    
    const productsCount = await Product.countDocuments(filterCondition);

    const apiFeatures = new APIFeatures(
      Product.find(filterCondition).populate('store', 'name slug logo'),
      queryParams
    )
      .search()
      .filter()
      .sort()
      .paginate(resPerPage);

    const products = await apiFeatures.query;

    res.status(200).json({
      success: true,
      count: products.length,
      productsCount,
      resPerPage,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('store', 'name slug logo rating')
      .populate('category', 'name');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const store = await Store.findOne({ vendor: req.user.id });
    if (!store) {
      return res.status(400).json({ success: false, message: 'Vendor must create a store first' });
    }

    let imageUrls = [];

    if (req.body.images) {
      imageUrls = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      const uploadedCloudinaryUrls = await Promise.all(uploadPromises);
      imageUrls = [...imageUrls, ...uploadedCloudinaryUrls];
    }

    let categoryId = req.body.category;
    if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
      const categoryDoc = await Category.findOne({
        name: { $regex: `^${categoryId}$`, $options: 'i' },
      });
      if (categoryDoc) {
        categoryId = categoryDoc._id;
      } else {
        return res.status(400).json({
          success: false,
          message: `Category '${req.body.category}' not found in database.`,
        });
      }
    }
    
    const productData = {
      ...req.body,
      store: store._id,
      images: imageUrls,
      isPublished: false, 
      approvalStatus: 'pending',
    };

    if (typeof productData.variants === 'string') {
      try {
        productData.variants = JSON.parse(productData.variants);
      } catch (e) {}
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product submitted successfully and is pending admin approval.',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let imageUrls = [];

    if (req.body.images) {
      imageUrls = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      const uploadedCloudinaryUrls = await Promise.all(uploadPromises);
      imageUrls = [...imageUrls, ...uploadedCloudinaryUrls];
    }

    const updateData = { ...req.body };
    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    if (typeof updateData.variants === 'string') {
      try {
        updateData.variants = JSON.parse(updateData.variants);
      } catch (e) {}
    }

    if (req.user.role === 'vendor') {
      updateData.approvalStatus = 'pending';
      updateData.isPublished = false;
    }

    product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};