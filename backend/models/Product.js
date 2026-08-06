
import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Size", "Color"
  options: [{ type: String, required: true }], // e.g., ["S", "M", "L"] or ["Red", "Blue"]
});

const productSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please specify a category'],
    },
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      min: [0, 'Price must be positive'],
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Please specify stock count'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    variants: [variantSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
    },
    rejectionReason: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },   // <--- Added to include virtuals in res.json()
    toObject: { virtuals: true }, // <--- Added to include virtuals when converting to Object
  }
);

productSchema.pre('validate', function () {
  if (this.name && (this.isModified('name') || !this.slug)) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
});

// Virtual Populate for 'reviews'
productSchema.virtual('reviews', {
  ref: 'Review',          // The model to query (Review)
  localField: '_id',      // Product ID (_id)
  foreignField: 'product', // 'product' field in the Review schema
});

const Product = mongoose.model('Product', productSchema);
export default Product;