// src/components/vendor/VariantManager.jsx
import React, { useState } from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';

const VariantManager = ({ variants = [], onChange }) => {
  const [newVariant, setNewVariant] = useState({ name: '', sku: '', price: '', stock: '' });

  const handleAddVariant = () => {
    if (!newVariant.name.trim() || !newVariant.price) return;
    const updated = [
      ...variants,
      {
        id: Date.now().toString(),
        name: newVariant.name.trim(),
        sku: newVariant.sku.trim() || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        price: parseFloat(newVariant.price) || 0,
        stock: parseInt(newVariant.stock, 10) || 0,
      },
    ];
    onChange(updated);
    setNewVariant({ name: '', sku: '', price: '', stock: '' });
  };

  const handleRemoveVariant = (id) => {
    onChange(variants.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-4 border border-slate-200 rounded-lg p-4 bg-slate-50/50">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" /> Product Variants (Optional)
        </label>
        <span className="text-xs text-slate-500">{variants.length} added</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end bg-white p-3 rounded-lg border border-slate-200">
        <InputField
          placeholder="Variant Name (e.g. XL - Black)"
          value={newVariant.name}
          onChange={(e) => setNewVariant((p) => ({ ...p, name: e.target.value }))}
        />
        <InputField
          placeholder="SKU Code"
          value={newVariant.sku}
          onChange={(e) => setNewVariant((p) => ({ ...p, sku: e.target.value }))}
        />
        <InputField
          type="number"
          placeholder="Price ($)"
          value={newVariant.price}
          onChange={(e) => setNewVariant((p) => ({ ...p, price: e.target.value }))}
        />
        <div className="flex gap-2">
          <InputField
            type="number"
            placeholder="Stock"
            value={newVariant.stock}
            onChange={(e) => setNewVariant((p) => ({ ...p, stock: e.target.value }))}
          />
          <Button variant="primary" size="md" onClick={handleAddVariant} icon={Plus}>
            Add
          </Button>
        </div>
      </div>

      {variants.length > 0 && (
        <div className="space-y-2 mt-3">
          {variants.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800"
            >
              <div className="flex items-center gap-4">
                <span className="font-semibold text-slate-900">{v.name}</span>
                <span className="text-slate-500">SKU: {v.sku}</span>
                <span className="font-medium text-emerald-600">${v.price.toFixed(2)}</span>
                <span className="text-slate-500">Qty: {v.stock}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveVariant(v.id)}
                className="text-slate-400 hover:text-red-600 p-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VariantManager;