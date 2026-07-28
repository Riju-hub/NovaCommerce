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
        { approvalStatus: { $exists: false } } // Legacy products
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

    // 1. Process Multer file uploads to Cloudinary
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      const uploadedCloudinaryUrls = await Promise.all(uploadPromises);
      imageUrls = [...imageUrls, ...uploadedCloudinaryUrls];
    }

    // 2. Process any direct image URL strings passed in body
    if (req.body.images) {
      const bodyImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
      const validBodyUrls = bodyImages.filter(
        (url) => typeof url === 'string' && url.trim().startsWith('http')
      );
      imageUrls = [...imageUrls, ...validBodyUrls];
    }

    // 3. Fallback placeholder
    if (imageUrls.length === 0) {
      imageUrls = ['https://via.placeholder.com/600x600?text=Product+Image'];
    }

    // Handle Category Lookup
    let categoryId = req.body.category;
    if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
      let categoryDoc = await Category.findOne({
        name: { $regex: `^${categoryId}$`, $options: 'i' },
      });

      if (!categoryDoc) {
        categoryDoc = await Category.create({ name: categoryId });
      }
      categoryId = categoryDoc._id;
    }

    // Parse Variants
    let variants = req.body.variants || [];
    if (typeof variants === 'string') {
      try {
        variants = JSON.parse(variants);
      } catch (e) {
        variants = [];
      }
    }

    // Build Product Object
    const productData = {
      name: req.body.name || req.body.title,
      description: req.body.description,
      price: Number(req.body.price),
      stock: Number(req.body.stock || 0),
      category: categoryId,
      store: store._id,
      images: imageUrls,
      variants: variants,
      isPublished: true,          // Immediate auto-approval
      approvalStatus: 'approved', // Immediate auto-approval
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created and published successfully.',
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

    // Collect existing URLs from body
    if (req.body.images) {
      const bodyImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
      imageUrls = bodyImages.filter((url) => typeof url === 'string' && url.trim().startsWith('http'));
    }

    // Process new file uploads
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      const uploadedCloudinaryUrls = await Promise.all(uploadPromises);
      imageUrls = [...imageUrls, ...uploadedCloudinaryUrls];
    }

    const updateData = { ...req.body };

    // Sync name if title is provided
    if (updateData.title && !updateData.name) {
      updateData.name = updateData.title;
    }

    // Update images array if provided
    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    // Resolve Category
    if (updateData.category && !mongoose.Types.ObjectId.isValid(updateData.category)) {
      let categoryDoc = await Category.findOne({
        name: { $regex: `^${updateData.category}$`, $options: 'i' },
      });

      if (!categoryDoc) {
        categoryDoc = await Category.create({ name: updateData.category });
      }
      updateData.category = categoryDoc._id;
    }

    // Parse Variants
    if (typeof updateData.variants === 'string') {
      try {
        updateData.variants = JSON.parse(updateData.variants);
      } catch (e) {}
    }

    // FIXED: Using returnDocument: 'after' instead of deprecated new: true
    product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      returnDocument: 'after',
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