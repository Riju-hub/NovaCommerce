
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Plus, CheckCircle2 } from 'lucide-react';
// import VendorSidebar from '../../components/vendor/VendorSidebar';
// import ProductList from '../../components/vendor/ProductList';
// import ProductForm from '../../components/vendor/ProductForm';
// import Button from '../../components/common/Button';
// import Modal from '../../components/common/Modal';
// import {
//   fetchProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from '../../redux/slices/productSlice';

// const ManageProducts = () => {
//   const dispatch = useDispatch();
//   const { items: products, loading } = useSelector((state) => state.product);
//   const { storeInfo } = useSelector((state) => state.vendor);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [showSuccessModal, setShowSuccessModal] = useState(false); // Renamed state for clarity

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleOpenCreateModal = () => {
//     setEditingProduct(null);
//     setIsModalOpen(true);
//   };

//   const handleOpenEditModal = (product) => {
//     setEditingProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleDeleteProduct = (id) => {
//     if (window.confirm('Are you sure you want to delete this product listing?')) {
//       dispatch(deleteProduct(id));
//     }
//   };

//   const handleFormSubmit = async (formData) => {
//     let resultAction;
    
//     if (editingProduct) {
//       resultAction = await dispatch(updateProduct({ id: editingProduct._id, formData }));
//     } else {
//       resultAction = await dispatch(createProduct(formData));
//     }

//     if (
//       createProduct.fulfilled.match(resultAction) || 
//       updateProduct.fulfilled.match(resultAction)
//     ) {
//       setIsModalOpen(false);
//       setShowSuccessModal(true);
//       dispatch(fetchProducts()); 
//     }
//   };

//   return (
//     <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
//       <VendorSidebar storeName={storeInfo?.storeName} />

//       <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">Manage Inventory</h1>
//             <p className="text-xs text-slate-500">
//               Add, edit, or remove items from your vendor store catalog.
//             </p>
//           </div>

//           <Button
//             variant="primary"
//             onClick={handleOpenCreateModal}
//             icon={Plus}
//           >
//             Add New Product
//           </Button>
//         </div>

//         <ProductList
//           products={products}
//           onEdit={handleOpenEditModal}
//           onDelete={handleDeleteProduct}
//         />

//         <Modal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           title={editingProduct ? 'Edit Product' : 'Add New Inventory Item'}
//           maxWidth="max-w-3xl"
//         >
//           <ProductForm
//             initialData={editingProduct || {}}
//             onSubmit={handleFormSubmit}
//             isLoading={loading}
//           />
//         </Modal>

//         {/* Updated Success Modal to inform vendor of immediate publishing */}
//         {showSuccessModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs">
//             <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl border border-slate-100 text-center space-y-4">
//               <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
//                 <CheckCircle2 className="w-6 h-6" />
//               </div>

//               <h3 className="text-lg font-bold text-slate-900">
//                 {editingProduct ? 'Product Updated' : 'Product Published!'}
//               </h3>

//               <p className="text-xs text-slate-600 leading-relaxed">
//                 {editingProduct
//                   ? 'Your product details have been updated and changes are now live on the store.'
//                   : 'Your new product has been created and is now immediately live in the store catalog.'}
//               </p>

//               <button
//                 onClick={() => setShowSuccessModal(false)}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
//               >
//                 Got it
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ManageProducts;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle2, Package, Sparkles, Cpu } from 'lucide-react';
import VendorSidebar from '../../components/vendor/VendorSidebar';
import ProductList from '../../components/vendor/ProductList';
import ProductForm from '../../components/vendor/ProductForm';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../redux/slices/productSlice';

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.product);
  const { storeInfo } = useSelector((state) => state.vendor);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product listing?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleFormSubmit = async (formData) => {
    let resultAction;
    
    if (editingProduct) {
      resultAction = await dispatch(updateProduct({ id: editingProduct._id, formData }));
    } else {
      resultAction = await dispatch(createProduct(formData));
    }

    if (
      createProduct.fulfilled.match(resultAction) || 
      updateProduct.fulfilled.match(resultAction)
    ) {
      setIsModalOpen(false);
      setShowSuccessModal(true);
      dispatch(fetchProducts()); 
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 font-sans">
      <VendorSidebar storeName={storeInfo?.storeName} />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto w-full min-w-0">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-1">
              <Package className="w-4 h-4" /> Catalog Management
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Manage Inventory <Sparkles className="w-5 h-5 text-indigo-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Add, edit, or remove items from your vendor store catalog.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={handleOpenCreateModal}
            icon={Plus}
            className="shadow-lg shadow-indigo-600/30 text-xs font-bold px-5 py-3 cursor-pointer shrink-0"
          >
            Add New Product
          </Button>
        </div>

        {/* Product List Component */}
        <ProductList
          products={products}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteProduct}
        />

        {/* Product Form Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProduct ? 'Edit Product' : 'Add New Inventory Item'}
          maxWidth="max-w-3xl"
        >
          <ProductForm
            initialData={editingProduct || {}}
            onSubmit={handleFormSubmit}
            isLoading={loading}
          />
        </Modal>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSuccessModal(false)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
              />

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center space-y-5 z-10 text-slate-100"
              >
                <div className="w-14 h-14 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white tracking-tight">
                    {editingProduct ? 'Product Updated' : 'Product Published!'}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {editingProduct
                      ? 'Your product details have been updated and changes are now live on the store.'
                      : 'Your new product has been created and is now immediately live in the store catalog.'}
                  </p>
                </div>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  Got it
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ManageProducts;