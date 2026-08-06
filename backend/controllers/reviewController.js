
import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc    Create new product review
// @route   POST /api/v1/products/:productId/reviews
// @access  Private (Logged-in Users)
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;
    const userId = req.user._id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed this product
    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: userId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Create review
    const review = await Review.create({
      user: userId,
      product: productId,
      rating: Number(rating),
      comment,
    });

    // Populate user info for frontend response
    await review.populate('user', 'name email');

    // Recalculate average ratings on the product document
    const allReviews = await Review.find({ product: productId });
    const avgRating =
      allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;

    product.ratings = avgRating;
    product.numReviews = allReviews.length;
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Server error while submitting review',
    });
  }
};

// @desc    Get all reviews for a product
// @route   GET /api/v1/products/:productId/reviews
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to fetch reviews',
    });
  }
};

// @desc    Delete product review
// @route   DELETE /api/v1/products/:productId/reviews/:reviewId
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Authorization check: Compare review author ID with logged-in user ID
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();

    // Recalculate average rating for the product
    const product = await Product.findById(productId);
    if (product) {
      const remainingReviews = await Review.find({ product: productId });
      
      product.numReviews = remainingReviews.length;
      product.ratings = remainingReviews.length > 0
        ? remainingReviews.reduce((acc, item) => item.rating + acc, 0) / remainingReviews.length
        : 0;

      await product.save();
    }

    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error while deleting review' });
  }
};