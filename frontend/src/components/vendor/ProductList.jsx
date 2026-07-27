// src/components/vendor/ProductList.jsx
import React from 'react';
import { Edit2, Trash2, Tag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductList = ({ products = [], onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
        <Tag className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <p className="text-sm font-medium text-slate-700">No products found</p>
        <p className="text-xs text-slate-400 mt-0.5">Start adding items to your store catalog.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4">Item</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4">Stock</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {products.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/80'}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 truncate max-w-xs">{item.title}</h4>
                    <span className="text-[10px] text-slate-400">ID: {item._id}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-slate-600">{item.category}</td>
                <td className="py-3 px-4 font-bold text-slate-900">${parseFloat(item.price).toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.stock > 10
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.stock > 0
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/products/${item._id}`}
                      title="Preview Product"
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onEdit(item)}
                      title="Edit Product"
                      className="p-1.5 text-slate-400 hover:text-amber-600 rounded-md hover:bg-slate-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      title="Delete Product"
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100"
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
    </div>
  );
};

export default ProductList;