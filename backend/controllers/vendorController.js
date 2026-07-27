import Store from '../models/Store.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

export const createStore = async (req, res, next) => {
  try {
    let store = await Store.findOne({ vendor: req.user.id });
    if (store) {
      return res.status(400).json({ success: false, message: 'Vendor already has a store' });
    }

    store = await Store.create({
      vendor: req.user.id,
      name: req.body.name,
      description: req.body.description,
      logo: req.body.logo,
      banner: req.body.banner,
      bankDetails: req.body.bankDetails,
    });

    await User.findByIdAndUpdate(req.user.id, { store: store._id, role: 'vendor' });

    res.status(201).json({ success: true, data: store });
  } catch (error) {
    next(error);
  }
};

export const getMyStore = async (req, res, next) => {
  try {
    const store = await Store.findOne({ vendor: req.user.id });
    if (!store) {
      return res.status(404).json({ success: false, message: 'No store found for this vendor' });
    }
    res.status(200).json({ success: true, data: store });
  } catch (error) {
    next(error);
  }
};

export const updateStore = async (req, res, next) => {
  try {
    const store = await Store.findOneAndUpdate({ vendor: req.user.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: store });
  } catch (error) {
    next(error);
  }
};

export const getVendorProfile = async (req, res, next) => {
  try {
    const store = await Store.findOne({ vendor: req.user.id });

    if (!store) {
      return res.status(404).json({ success: false, message: 'Vendor store not found' });
    }

    const activeProducts = await Product.countDocuments({
      store: store._id,
      isPublished: true,
      approvalStatus: 'approved',
    });

    res.status(200).json({
      success: true,
      storeInfo: {
        _id: store._id,
        storeName: store.name || store.storeName,
        name: store.name,
        description: store.description,
        logoUrl: store.logo || store.logoUrl,
        bannerUrl: store.banner || store.bannerUrl,
        contactEmail: store.contactEmail,
        contactPhone: store.contactPhone,
        website: store.website,
      },
      stats: {
        totalSales: store.totalSales || 0,
        totalOrders: store.totalOrders || 0,
        activeProducts,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateStoreSetup = async (req, res, next) => {
  try {
    const {
      storeName,
      name,
      description,
      logoUrl,
      bannerUrl,
      contactEmail,
      contactPhone,
      website,
    } = req.body;

    const actualName = (storeName || name || '').trim();

    if (!actualName) {
      return res.status(400).json({
        success: false,
        message: 'Store name is required.',
      });
    }

    const updateData = {
      name: actualName,
      vendor: req.user.id,
    };

    if (description !== undefined) updateData.description = description;
    if (logoUrl && logoUrl.trim() !== '') updateData.logo = logoUrl.trim();
    if (bannerUrl && bannerUrl.trim() !== '') updateData.banner = bannerUrl.trim();
    if (contactEmail && contactEmail.trim() !== '') updateData.contactEmail = contactEmail.trim();
    if (contactPhone && contactPhone.trim() !== '') updateData.contactPhone = contactPhone.trim();
    if (website && website.trim() !== '') updateData.website = website.trim();

    const store = await Store.findOneAndUpdate(
      { vendor: req.user.id },
      { $set: updateData },
      { new: true, runValidators: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: 'Store settings updated successfully',
      storeInfo: {
        _id: store._id,
        storeName: store.name,
        name: store.name,
        description: store.description,
        logoUrl: store.logo,
        bannerUrl: store.banner,
        contactEmail: store.contactEmail,
        contactPhone: store.contactPhone,
        website: store.website,
      },
      data: store,
    });
  } catch (error) {
    next(error);
  }
};