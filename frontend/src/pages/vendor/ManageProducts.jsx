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
//   const [showApprovalModal, setShowApprovalModal] = useState(false);

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
//       setShowApprovalModal(true);
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

//         {showApprovalModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs">
//             <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl border border-slate-100 text-center space-y-4">
//               <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
//                 <CheckCircle2 className="w-6 h-6" />
//               </div>

//               <h3 className="text-lg font-bold text-slate-900">Submitted for Approval</h3>

//               <p className="text-xs text-slate-600 leading-relaxed">
//                 Your product details have been saved and sent to platform administrators for review. It will become visible on the marketplace once approved.
//               </p>

//               <button
//                 onClick={() => setShowApprovalModal(false)}
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
import { Plus, CheckCircle2 } from 'lucide-react';
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
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Renamed state for clarity

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
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <VendorSidebar storeName={storeInfo?.storeName} />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manage Inventory</h1>
            <p className="text-xs text-slate-500">
              Add, edit, or remove items from your vendor store catalog.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={handleOpenCreateModal}
            icon={Plus}
          >
            Add New Product
          </Button>
        </div>

        <ProductList
          products={products}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteProduct}
        />

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

        {/* Updated Success Modal to inform vendor of immediate publishing */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl border border-slate-100 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                {editingProduct ? 'Product Updated' : 'Product Published!'}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {editingProduct
                  ? 'Your product details have been updated and changes are now live on the store.'
                  : 'Your new product has been created and is now immediately live in the store catalog.'}
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageProducts;