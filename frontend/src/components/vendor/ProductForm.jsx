import React, { useState } from 'react';
import { Package, Save } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import VariantManager from './VariantManager';
import ImageUploader from './ImageUploader';

const ProductForm = ({ initialData = {}, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || initialData.name || '',
    category: initialData.category || '',
    price: initialData.price || '',
    stock: initialData.stock || '',
    description: initialData.description || '',
    images: initialData.images || [],
    variants: initialData.variants || [],
  });

  const [fileItems, setFileItems] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fileItems.length > 0) {
      const payload = new FormData();
      payload.append('name', formData.title);
      payload.append('title', formData.title);
      payload.append('category', formData.category);
      payload.append('price', formData.price);
      payload.append('stock', formData.stock);
      payload.append('description', formData.description);

      formData.images.forEach((url) => payload.append('images', url));
      fileItems.forEach((item) => payload.append('imageFiles', item.file));
      payload.append('variants', JSON.stringify(formData.variants));

      onSubmit(payload);
    } else {
      onSubmit({
        ...formData,
        name: formData.title,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
      <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
        <Package className="w-5 h-5 text-blue-600" />
        {initialData._id ? 'Edit Product Details' : 'Add New Inventory Item'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Product Title"
          name="title"
          placeholder="e.g. Wireless Noise-Canceling Headphones"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          >
            <option value="">Select Category...</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Fitness">Fitness</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Base Price ($)"
          name="price"
          type="number"
          step="0.01"
          placeholder="99.99"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <InputField
          label="Total Stock Quantity"
          name="stock"
          type="number"
          placeholder="50"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Product Description
        </label>
        <textarea
          name="description"
          rows="4"
          placeholder="Detail the product key features, specifications, warranty..."
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none"
        />
      </div>

      <ImageUploader
        images={formData.images}
        fileItems={fileItems}
        onChange={(images, fileItems) => {
          setFormData((p) => ({ ...p, images }));
          setFileItems(fileItems);
        }}
      />

      <VariantManager
        variants={formData.variants}
        onChange={(variants) => setFormData((p) => ({ ...p, variants }))}
      />

      <div className="pt-2 flex justify-end gap-3">
        <Button type="submit" variant="primary" isLoading={isLoading} icon={Save}>
          {initialData._id ? 'Update Product' : 'Publish Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;