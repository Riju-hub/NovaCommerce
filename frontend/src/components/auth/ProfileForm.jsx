
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { User, Phone, MapPin, Save, UserCircle } from 'lucide-react';
// import InputField from '../common/InputField';
// import Button from '../common/Button';
// import Toast from '../common/Toast';
// import useAuth from '../../hooks/useAuth';
// import axiosInstance from '../../services/axiosInstance';

// const ProfileForm = () => {
//   const { user } = useAuth();

//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     phone: user?.phone || '',
//     address: user?.address || '',
//     city: user?.city || '',
//     postalCode: user?.postalCode || '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState(null);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axiosInstance.put('/auth/profile', formData);
//       setToast({ message: 'Profile updated successfully!', type: 'success' });
//     } catch (err) {
//       setToast({
//         message: err.response?.data?.message || 'Failed to update profile',
//         type: 'error',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 max-w-2xl mx-auto"
//     >
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
//         <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
//           <UserCircle className="w-6 h-6" />
//         </div>
//         <div>
//           <h2 className="text-lg font-bold text-slate-900 tracking-tight">Personal Information</h2>
//           <p className="text-xs text-slate-500">Update your account settings and contact info.</p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <InputField
//             label="Full Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             icon={User}
//             required
//           />

//           <InputField
//             label="Email Address"
//             name="email"
//             type="email"
//             value={formData.email}
//             disabled
//             helperText="Email address cannot be changed."
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <InputField
//             label="Phone Number"
//             name="phone"
//             placeholder="+1 (555) 000-0000"
//             value={formData.phone}
//             onChange={handleChange}
//             icon={Phone}
//           />

//           <InputField
//             label="Postal Code"
//             name="postalCode"
//             placeholder="10001"
//             value={formData.postalCode}
//             onChange={handleChange}
//           />
//         </div>

//         <InputField
//           label="Street Address"
//           name="address"
//           placeholder="123 Main Street, Suite 4B"
//           value={formData.address}
//           onChange={handleChange}
//           icon={MapPin}
//         />

//         <InputField
//           label="City"
//           name="city"
//           placeholder="New York"
//           value={formData.city}
//           onChange={handleChange}
//         />

//         <div className="pt-4 flex justify-end">
//           <Button
//             type="submit"
//             variant="primary"
//             isLoading={loading}
//             icon={Save}
//             className="px-6 py-2.5"
//           >
//             Save Changes
//           </Button>
//         </div>
//       </form>
//     </motion.div>
//   );
// };

// export default ProfileForm;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Save, UserCircle } from 'lucide-react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import Toast from '../common/Toast';
import useAuth from '../../hooks/useAuth';
import axiosInstance from '../../services/axiosInstance';

const ProfileForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.put('/auth/profile', formData);
      setToast({ message: 'Profile updated successfully!', type: 'success' });
    } catch (err) {
      setToast({
        message: err.response?.data?.message || 'Failed to update profile',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const darkInputClasses = "[&_label]:text-slate-300 [&_input]:!bg-slate-950 [&_input]:!text-slate-100 [&_input]:!placeholder-slate-500 [&_input]:!border-slate-800 focus-within:[&_input]:!border-indigo-500 focus-within:[&_input]:!ring-indigo-500/20";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl max-w-2xl mx-auto text-slate-100"
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="p-2.5 bg-indigo-950/80 text-indigo-400 rounded-xl border border-indigo-800/50 shadow-inner">
          <UserCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">Personal Information</h2>
          <p className="text-xs text-slate-400">Update your account settings and contact info.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={User}
            required
            className={darkInputClasses}
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            disabled
            helperText="Email address cannot be changed."
            className="[&_label]:text-slate-300 [&_input]:!bg-slate-900/60 [&_input]:!text-slate-400 [&_input]:!border-slate-800 cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Phone Number"
            name="phone"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            icon={Phone}
            className={darkInputClasses}
          />

          <InputField
            label="Postal Code"
            name="postalCode"
            placeholder="10001"
            value={formData.postalCode}
            onChange={handleChange}
            className={darkInputClasses}
          />
        </div>

        <InputField
          label="Street Address"
          name="address"
          placeholder="123 Main Street, Suite 4B"
          value={formData.address}
          onChange={handleChange}
          icon={MapPin}
          className={darkInputClasses}
        />

        <InputField
          label="City"
          name="city"
          placeholder="New York"
          value={formData.city}
          onChange={handleChange}
          className={darkInputClasses}
        />

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            icon={Save}
            className="px-6 py-2.5 shadow-lg shadow-indigo-600/30 text-white font-bold cursor-pointer"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileForm;