import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Save, Sparkles, Cpu } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import VariantManager from './VariantManager';
import ImageUploader from './ImageUploader';

const ProductForm = ({ initialData = {}, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || initialData.name || '',
    category: initialData.category?._id || initialData.category || '',
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

    if (fileItems && fileItems.length > 0) {
      const payload = new FormData();

      payload.append('name', formData.title);
      payload.append('title', formData.title);
      payload.append('category', formData.category);
      payload.append('price', String(formData.price));
      payload.append('stock', String(formData.stock));
      payload.append('description', formData.description || '');

      if (Array.isArray(formData.images)) {
        formData.images.forEach((url) => {
          if (typeof url === 'string' && url.startsWith('http')) {
            payload.append('images', url);
          }
        });
      }

      fileItems.forEach((item) => {
        const rawFile = item.file || item;
        if (rawFile instanceof File) {
          payload.append('imageFiles', rawFile);
        }
      });

      payload.append('variants', JSON.stringify(formData.variants || []));

      onSubmit(payload);
    } else {
      onSubmit({
        ...formData,
        name: formData.title,
        images: formData.images.length > 0 ? formData.images : ['https://via.placeholder.com/600x600?text=Product+Image'],
      });
    }
  };

  // Reusable dark input class targeting the inner input element
  const darkInputClasses = "[&_label]:text-slate-300 [&_input]:!bg-slate-950 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-slate-800 focus-within:[&_input]:!border-indigo-500 focus-within:[&_input]:!ring-indigo-500/20";

  return (
    <motion.form 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 max-w-4xl mx-auto text-slate-100"
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-950/80 text-indigo-400 rounded-xl border border-indigo-800/50 shadow-inner">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-1.5">
              {initialData._id ? 'Edit Inventory Item' : 'Add New Inventory Item'} <Sparkles className="w-4 h-4 text-indigo-400" />
            </h2>
            <p className="text-xs text-slate-400">Configure product specifications and media assets.</p>
          </div>
        </div>
        <span className="hidden sm:flex items-center gap-1 text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2.5 py-1 rounded-full">
          <Cpu className="w-3 h-3" /> Auto-Catalog Sync
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Product Title"
          name="title"
          placeholder="e.g. Wireless Noise-Canceling Headphones"
          value={formData.title}
          onChange={handleChange}
          required
          className={darkInputClasses}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Category <span className="text-rose-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
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
          label="Base Price (₹)"
          name="price"
          type="number"
          step="0.01"
          placeholder="999.00"
          value={formData.price}
          onChange={handleChange}
          required
          className={darkInputClasses}
        />
        <InputField
          label="Total Stock Quantity"
          name="stock"
          type="number"
          placeholder="50"
          value={formData.stock}
          onChange={handleChange}
          required
          className={darkInputClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Product Description
        </label>
        <textarea
          name="description"
          rows="4"
          placeholder="Detail key features, specifications, warranty..."
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
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
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isLoading} 
          icon={Save} 
          className="px-7 py-3 shadow-lg shadow-indigo-600/30 text-white font-bold cursor-pointer"
        >
          {initialData._id ? 'Update Product' : 'Publish Product'}
        </Button>
      </div>
    </motion.form>
  );
};

export default ProductForm;