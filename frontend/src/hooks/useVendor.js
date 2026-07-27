// src/hooks/useVendor.js
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchVendorProfile,
  updateStoreDetails,
} from '../redux/slices/vendorSlice';

export const useVendor = () => {
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.vendor);

  return {
    storeInfo: vendor.storeInfo,
    stats: vendor.stats,
    loading: vendor.loading,
    error: vendor.error,
    getVendorProfile: () => dispatch(fetchVendorProfile()),
    saveStoreSetup: (storeData) => dispatch(updateStoreDetails(storeData)),
  };
};

export default useVendor;