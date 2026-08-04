
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Tag, Cpu } from 'lucide-react';
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

  // Reusable dark input class targeting the inner input element
  const darkInputClasses = "[&_label]:text-slate-300 [&_input]:!bg-slate-950 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-slate-800 focus-within:[&_input]:!border-indigo-500 focus-within:[&_input]:!ring-indigo-500/20";

  return (
    <div className="space-y-4 border border-slate-800 rounded-2xl p-5 bg-slate-950/60 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
          <Tag className="w-4 h-4" /> Product Options / Variants
        </label>
        <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full">
          {variants.length} Configured
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-end bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
        <InputField
          placeholder="Variant Name (e.g. XL - Black)"
          value={newVariant.name}
          onChange={(e) => setNewVariant((p) => ({ ...p, name: e.target.value }))}
          className={darkInputClasses}
        />
        <InputField
          placeholder="SKU Code"
          value={newVariant.sku}
          onChange={(e) => setNewVariant((p) => ({ ...p, sku: e.target.value }))}
          className={darkInputClasses}
        />
        <InputField
          type="number"
          placeholder="Price (₹)"
          value={newVariant.price}
          onChange={(e) => setNewVariant((p) => ({ ...p, price: e.target.value }))}
          className={darkInputClasses}
        />
        <div className="flex gap-2">
          <InputField
            type="number"
            placeholder="Stock"
            value={newVariant.stock}
            onChange={(e) => setNewVariant((p) => ({ ...p, stock: e.target.value }))}
            className={darkInputClasses}
          />
          <Button variant="primary" size="md" onClick={handleAddVariant} icon={Plus} className="shrink-0 cursor-pointer">
            Add
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {variants.length > 0 && (
          <div className="space-y-2 mt-3">
            {variants.map((v) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={v.id || v._id}
                className="flex items-center justify-between bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-200"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-extrabold text-white">{v.name}</span>
                  <span className="text-slate-500">SKU: {v.sku}</span>
                  <span className="font-bold text-indigo-400">₹{typeof v.price === 'number' ? v.price.toFixed(2) : v.price}</span>
                  <span className="text-slate-400">Qty: {v.stock}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(v.id || v._id)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VariantManager;