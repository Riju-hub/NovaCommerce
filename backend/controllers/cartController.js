import Product from '../models/Product.js';

export const validateCart = async (req, res, next) => {
  try {
    const { items } = req.body; // array of { product: id, quantity: num }
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items empty' });
    }

    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product).populate('store', 'name');
      if (product && product.isPublished && product.stock >= item.quantity) {
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        validatedItems.push({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0] || '',
          quantity: item.quantity,
          store: product.store._id,
          storeName: product.store.name,
          stock: product.stock,
        });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        items: validatedItems,
        subtotal,
        tax: subtotal * 0.08,
        shipping: subtotal > 100 ? 0 : 10,
        total: subtotal + subtotal * 0.08 + (subtotal > 100 ? 0 : 10),
      },
    });
  } catch (error) {
    next(error);
  }
};