// src/pages/customer/ProductListingPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RefreshCw } from 'lucide-react';
import ProductGrid from '../../components/customer/ProductGrid';
import InputField from '../../components/common/InputField';
import { fetchProducts } from '../../redux/slices/productSlice';

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || '';

  const [search, setSearch] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);

  const { items: products, loading } = useSelector((state) => state.product);

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Fitness'];

  useEffect(() => {
    const params = {};
    if (querySearch) params.search = querySearch;
    if (queryCategory && queryCategory !== 'All') params.category = queryCategory;

    dispatch(fetchProducts(params));
  }, [dispatch, querySearch, queryCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (search.trim()) newParams.set('search', search.trim());
    else newParams.delete('search');
    setSearchParams(newParams);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat && cat !== 'All') newParams.set('category', cat);
    else newParams.delete('category');
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Explore Catalog</h1>
          <p className="text-xs text-slate-500">Discover quality products across independent stores</p>
        </div>

        <form onSubmit={handleSearchSubmit} className="w-full md:w-96">
          <InputField
            placeholder="Search catalog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs h-fit space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" /> Categories
            </h3>
            {(querySearch || queryCategory) && (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                  setSearchParams({});
                }}
                className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  (selectedCategory === cat) || (cat === 'All' && !selectedCategory)
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        <main className="md:col-span-3">
          <ProductGrid products={products} isLoading={loading} />
        </main>
      </div>
    </div>
  );
};

export default ProductListingPage;