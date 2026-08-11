// // src/pages/customer/ProductListingPage.jsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useSearchParams } from 'react-router-dom';
// import { Search, Filter, RefreshCw } from 'lucide-react';
// import ProductGrid from '../../components/customer/ProductGrid';
// import InputField from '../../components/common/InputField';
// import { fetchProducts } from '../../redux/slices/productSlice';

// const ProductListingPage = () => {
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const querySearch = searchParams.get('search') || '';
//   const queryCategory = searchParams.get('category') || '';

//   const [search, setSearch] = useState(querySearch);
//   const [selectedCategory, setSelectedCategory] = useState(queryCategory);

//   const { items: products, loading } = useSelector((state) => state.product);

//   const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Fitness'];

//   useEffect(() => {
//     const params = {};
//     if (querySearch) params.search = querySearch;
//     if (queryCategory && queryCategory !== 'All') params.category = queryCategory;

//     dispatch(fetchProducts(params));
//   }, [dispatch, querySearch, queryCategory]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     const newParams = new URLSearchParams(searchParams);
//     if (search.trim()) newParams.set('search', search.trim());
//     else newParams.delete('search');
//     setSearchParams(newParams);
//   };

//   const handleCategorySelect = (cat) => {
//     setSelectedCategory(cat);
//     const newParams = new URLSearchParams(searchParams);
//     if (cat && cat !== 'All') newParams.set('category', cat);
//     else newParams.delete('category');
//     setSearchParams(newParams);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Explore Catalog</h1>
//           <p className="text-xs text-slate-500">Discover quality products across independent stores</p>
//         </div>

//         <form onSubmit={handleSearchSubmit} className="w-full md:w-96">
//           <InputField
//             placeholder="Search catalog..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             icon={Search}
//           />
//         </form>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//         <aside className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs h-fit space-y-6">
//           <div className="flex items-center justify-between pb-3 border-b border-slate-100">
//             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
//               <Filter className="w-4 h-4 text-blue-600" /> Categories
//             </h3>
//             {(querySearch || queryCategory) && (
//               <button
//                 onClick={() => {
//                   setSearch('');
//                   setSelectedCategory('All');
//                   setSearchParams({});
//                 }}
//                 className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
//               >
//                 <RefreshCw className="w-3 h-3" /> Reset
//               </button>
//             )}
//           </div>

//           <div className="space-y-1">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => handleCategorySelect(cat)}
//                 className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
//                   (selectedCategory === cat) || (cat === 'All' && !selectedCategory)
//                     ? 'bg-blue-600 text-white shadow-xs'
//                     : 'text-slate-600 hover:bg-slate-100'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </aside>

//         <main className="md:col-span-3">
//           <ProductGrid products={products} isLoading={loading} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProductListingPage;


// src/pages/customer/ProductListingPage.jsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useSearchParams } from 'react-router-dom';
// import { Search, Filter, RefreshCw, Dot } from 'lucide-react';
// import ProductGrid from '../../components/customer/ProductGrid';
// import InputField from '../../components/common/InputField';
// import { fetchProducts } from '../../redux/slices/productSlice';

// /**
//  * Shares the ledger/paper design language from the marketplace hero:
//  * warm paper background, ink + gold + teal accents, Fraunces for
//  * headings, IBM Plex Mono for labels and counts. Load these fonts once
//  * globally rather than per-page.
//  */
// const FontImports = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
//   `}</style>
// );

// const ProductListingPage = () => {
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const querySearch = searchParams.get('search') || '';
//   const queryCategory = searchParams.get('category') || '';

//   const [search, setSearch] = useState(querySearch);
//   const [selectedCategory, setSelectedCategory] = useState(queryCategory);

//   const { items: products, loading } = useSelector((state) => state.product);

//   const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Fitness'];

//   useEffect(() => {
//     const params = {};
//     if (querySearch) params.search = querySearch;
//     if (queryCategory && queryCategory !== 'All') params.category = queryCategory;

//     dispatch(fetchProducts(params));
//   }, [dispatch, querySearch, queryCategory]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     const newParams = new URLSearchParams(searchParams);
//     if (search.trim()) newParams.set('search', search.trim());
//     else newParams.delete('search');
//     setSearchParams(newParams);
//   };

//   const handleCategorySelect = (cat) => {
//     setSelectedCategory(cat);
//     const newParams = new URLSearchParams(searchParams);
//     if (cat && cat !== 'All') newParams.set('category', cat);
//     else newParams.delete('category');
//     setSearchParams(newParams);
//   };

//   const hasActiveFilters = querySearch || (queryCategory && queryCategory !== 'All');

//   return (
//     <div className="min-h-screen bg-[#FAF7F0] font-['Inter']">
//       <FontImports />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-white p-6 rounded-2xl border border-[#E9E2CF] shadow-sm">
//           <div className="space-y-1.5">
//             <span className="inline-flex items-center gap-1.5 text-[10px] font-['IBM_Plex_Mono'] font-semibold uppercase tracking-[0.2em] text-[#B3843A]">
//               <Dot className="w-4 h-4 -mx-1" strokeWidth={6} /> Live inventory
//             </span>
//             <h1 className="font-['Fraunces'] text-2xl sm:text-3xl font-medium text-[#1A1F1C]">
//               Explore the catalog
//             </h1>
//             <p className="text-xs text-[#7A7A6E]">
//               Quality goods from independent, verified sellers
//             </p>
//           </div>

//           <form onSubmit={handleSearchSubmit} className="w-full md:w-96">
//             <InputField
//               placeholder="Search the catalog..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               icon={Search}
//             />
//           </form>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {/* Sidebar */}
//           <aside className="bg-white p-5 rounded-2xl border border-[#E9E2CF] shadow-sm h-fit space-y-5 md:sticky md:top-6">
//             <div className="flex items-center justify-between pb-3 border-b border-[#EFE9DA]">
//               <h3 className="text-[11px] font-['IBM_Plex_Mono'] font-semibold text-[#1A1F1C] uppercase tracking-[0.15em] flex items-center gap-2">
//                 <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#F4ECD7] text-[#B3843A]">
//                   <Filter className="w-3.5 h-3.5" />
//                 </span>
//                 Categories
//               </h3>
//               {hasActiveFilters && (
//                 <button
//                   onClick={() => {
//                     setSearch('');
//                     setSelectedCategory('All');
//                     setSearchParams({});
//                   }}
//                   className="text-[10px] font-['IBM_Plex_Mono'] font-semibold text-[#B3843A] hover:underline flex items-center gap-1"
//                 >
//                   <RefreshCw className="w-3 h-3" /> Reset
//                 </button>
//               )}
//             </div>

//             <div className="space-y-1">
//               {categories.map((cat) => {
//                 const isActive = selectedCategory === cat || (cat === 'All' && !selectedCategory);
//                 return (
//                   <button
//                     key={cat}
//                     onClick={() => handleCategorySelect(cat)}
//                     className={`w-full flex items-center gap-2.5 text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B3843A] ${
//                       isActive
//                         ? 'bg-[#1A1F1C] text-[#F5F1E6] shadow-sm'
//                         : 'text-[#5B5B50] hover:bg-[#F7F4EC]'
//                     }`}
//                   >
//                     <span
//                       className={`w-1.5 h-1.5 rounded-full shrink-0 ${
//                         isActive ? 'bg-[#D9A441]' : 'bg-[#D8D2BE]'
//                       }`}
//                     />
//                     {cat}
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="pt-4 border-t border-[#EFE9DA] flex items-center justify-between text-[10px] font-['IBM_Plex_Mono'] text-[#9A9A8B] uppercase tracking-widest">
//               <span>Results</span>
//               <span className="text-[#1A1F1C] font-semibold">{products?.length ?? 0}</span>
//             </div>
//           </aside>

//           {/* Product grid */}
//           <main className="md:col-span-3">
//             <ProductGrid products={products} isLoading={loading} />
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductListingPage;



// src/pages/customer/ProductListingPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  Star, 
  Check, 
  ChevronRight,
  TrendingUp,
  Zap
} from 'lucide-react';
import ProductGrid from '../../components/customer/ProductGrid';
import InputField from '../../components/common/InputField';
import { fetchProducts } from '../../redux/slices/productSlice';

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || '';
  const querySort = searchParams.get('sort') || 'popular';

  const [search, setSearch] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [selectedSort, setSelectedSort] = useState(querySort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(500);

  const { items: products, loading } = useSelector((state) => state.product);

  const categories = [
    { name: 'All', count: '12.4k+' },
    { name: 'Electronics', count: '3.2k' },
    { name: 'Fashion', count: '5.1k' },
    { name: 'Home & Kitchen', count: '2.8k' },
    { name: 'Fitness', count: '1.3k' }
  ];

  const quickAiPrompts = [
    { label: 'Trending Deals', param: 'trending' },
    { label: 'Top Rated 4.5+', param: 'top-rated' },
    { label: 'Under $100', param: 'budget' }
  ];

  useEffect(() => {
    const params = {};
    if (querySearch) params.search = querySearch;
    if (queryCategory && queryCategory !== 'All') params.category = queryCategory;
    if (querySort) params.sort = querySort;

    dispatch(fetchProducts(params));
  }, [dispatch, querySearch, queryCategory, querySort]);

  // Keep local input synchronized with URL params
  useEffect(() => {
    setSearch(querySearch);
    setSelectedCategory(queryCategory || 'All');
  }, [querySearch, queryCategory]);

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

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSelectedSort(sortValue);
    const newParams = new URLSearchParams(searchParams);
    if (sortValue) newParams.set('sort', sortValue);
    else newParams.delete('sort');
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedSort('popular');
    setPriceRange(500);
    setSearchParams({});
  };

  const removeFilter = (key) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    if (key === 'search') setSearch('');
    if (key === 'category') setSelectedCategory('All');
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI Catalog Discovery</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Explore Marketplace
              </h1>
              <p className="text-sm text-slate-400 max-w-lg">
                Discover millions of verified products from independent global sellers synced in real time.
              </p>
            </div>

            {/* Main Search Engine Box */}
            <form onSubmit={handleSearchSubmit} className="w-full lg:w-[420px]">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search catalog, brands, or keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-700/80 focus:border-indigo-500 text-slate-100 text-sm rounded-2xl pl-11 pr-24 py-3.5 outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs px-4 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* AI Quick Prompts Ribbon */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> AI Quick Filters:
            </span>
            {quickAiPrompts.map((prompt) => (
              <button
                key={prompt.param}
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.set('filter', prompt.param);
                  setSearchParams(newParams);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 hover:border-indigo-500/50 transition-all text-xs font-medium"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 h-fit space-y-6 shadow-xl backdrop-blur-xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-400" /> Catalog Filters
              </h3>
              {(querySearch || queryCategory) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              )}
            </div>

            {/* Category Filter Navigation */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                Categories
              </label>
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.name || (cat.name === 'All' && !selectedCategory);
                  return (
                    <button
                      key={cat.name}
                      onClick={() => handleCategorySelect(cat.name)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/20'
                          : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-mono font-bold uppercase text-slate-400 tracking-wider">
                  Max Price
                </label>
                <span className="font-extrabold text-indigo-400">${priceRange}</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Rating Filter */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <label className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                Minimum Rating
              </label>
              <div className="space-y-1">
                {[4, 3, 2].map((stars) => (
                  <button
                    key={stars}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800/80 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(stars)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                      <span className="text-slate-300 ml-1.5">{stars}.0 & up</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Main Grid Section */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Top Grid Status Bar & Controls */}
            <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl">
              
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
                >
                  <Filter className="w-4 h-4 text-indigo-400" /> Filters
                </button>

                <p className="text-xs text-slate-400">
                  Showing <span className="font-bold text-white">{products?.length || 0}</span> items
                </p>
              </div>

              {/* Sorting Select */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs text-slate-400 shrink-0">Sort by:</span>
                <select
                  value={selectedSort}
                  onChange={handleSortChange}
                  className="bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips Bar */}
            {(querySearch || (queryCategory && queryCategory !== 'All')) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400">Active Filters:</span>
                {querySearch && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs">
                    Search: "{querySearch}"
                    <X 
                      className="w-3.5 h-3.5 cursor-pointer hover:text-white" 
                      onClick={() => removeFilter('search')}
                    />
                  </span>
                )}
                {queryCategory && queryCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs">
                    Category: {queryCategory}
                    <X 
                      className="w-3.5 h-3.5 cursor-pointer hover:text-white" 
                      onClick={() => removeFilter('category')}
                    />
                  </span>
                )}
              </div>
            )}

            {/* Render Products Grid */}
            <ProductGrid products={products} isLoading={loading} />

          </main>
        </div>

      </div>
    </div>
  );
};

export default ProductListingPage;