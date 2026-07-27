// src/pages/customer/StoreFrontPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Store, Mail, Phone, Globe, ShieldCheck } from 'lucide-react';
import ProductGrid from '../../components/customer/ProductGrid';
import axiosInstance from '../../services/axiosInstance';

const StoreFrontPage = () => {
  const { vendorId } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStorefrontData = async () => {
      setLoading(true);
      try {
        const [storeRes, productsRes] = await Promise.all([
          axiosInstance.get(`/vendor/store/${vendorId}`),
          axiosInstance.get(`/products?vendorId=${vendorId}`),
        ]);
        setStore(storeRes.data);
        setProducts(productsRes.data.products || productsRes.data);
      } catch (err) {
        console.error('Failed to load storefront details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStorefrontData();
  }, [vendorId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="h-44 bg-gradient-to-r from-blue-600 to-indigo-900 relative">
          {store?.bannerUrl && (
            <img src={store.bannerUrl} alt="Store Banner" className="w-full h-full object-cover" />
          )}
        </div>

        <div className="px-6 pb-6 pt-0 relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4 -mt-12">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-md overflow-hidden shrink-0 flex items-center justify-center">
              {store?.logoUrl ? (
                <img src={store.logoUrl} alt={store.storeName} className="w-full h-full object-cover" />
              ) : (
                <Store className="w-10 h-10 text-blue-600" />
              )}
            </div>
            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">{store?.storeName || 'Vendor Store'}</h1>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Seller
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{store?.description || 'Welcome to our official store.'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2 border-t md:border-t-0 border-slate-100 w-full md:w-auto">
            {store?.contactEmail && (
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-blue-600" /> {store.contactEmail}</span>
            )}
            {store?.contactPhone && (
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-blue-600" /> {store.contactPhone}</span>
            )}
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-200">
          Store Catalog ({products.length} Items)
        </h2>
        <ProductGrid products={products} isLoading={loading} />
      </section>
    </div>
  );
};

export default StoreFrontPage;