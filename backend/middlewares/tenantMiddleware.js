import Store from '../models/Store.js';

export const resolveTenant = async (req, res, next) => {
  try {
    const storeSlug =
      req.params.storeSlug ||
      req.headers['x-tenant-slug'] ||
      req.hostname.split('.')[0];

    if (!storeSlug || storeSlug === 'localhost' || storeSlug === 'www') {
      return next();
    }

    const store = await Store.findOne({ slug: storeSlug, status: 'approved' });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: `Vendor store '${storeSlug}' not found or inactive`,
      });
    }
    req.store = store;
    next();
  } catch (error) {
    next(error);
  }
};