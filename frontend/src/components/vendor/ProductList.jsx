
import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Tag, Eye, PackageSearch, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductList = ({ products = [], onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-12 text-center text-slate-400 my-4 shadow-2xl flex flex-col items-center justify-center gap-3">
        <div className="p-3 bg-indigo-950/80 rounded-2xl border border-indigo-800/50 text-indigo-400">
          <PackageSearch className="w-8 h-8" />
        </div>
        <div>
          <p className="text-base font-extrabold text-white">No products found</p>
          <p className="text-xs text-slate-500 mt-1">Start adding items to build your store catalog.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-slate-800 overflow-hidden shadow-2xl"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
              <th className="py-4 px-5">Item</th>
              <th className="py-4 px-5">Category</th>
              <th className="py-4 px-5">Price</th>
              <th className="py-4 px-5">Stock</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs text-slate-300">
            {products.map((item) => (
              <tr key={item._id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-5 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-950 overflow-hidden border border-slate-800 shrink-0">
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/80'}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white truncate max-w-xs">{item.title || item.name}</h4>
                    <span className="text-[10px] font-mono text-slate-500">ID: {item._id}</span>
                  </div>
                </td>
                <td className="py-3.5 px-5 font-semibold text-slate-400">
                  <span className="bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold">
                    {typeof item.category === 'object' ? item.category?.name : item.category}
                  </span>
                </td>
                <td className="py-3.5 px-5 font-black text-white font-mono">
                  ₹{parseFloat(item.price).toFixed(2)}
                </td>
                <td className="py-3.5 px-5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      item.stock > 10
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                        : item.stock > 0
                        ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                        : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                    }`}
                  >
                    {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/products/${item._id}`}
                      title="Preview Product"
                      className="p-2 text-slate-400 hover:text-indigo-400 rounded-xl hover:bg-slate-800/80 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onEdit(item)}
                      title="Edit Product"
                      className="p-2 text-slate-400 hover:text-amber-400 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      title="Delete Product"
                      className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductList;