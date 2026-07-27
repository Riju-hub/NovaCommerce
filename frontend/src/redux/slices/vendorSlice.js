// src/redux/slices/vendorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

export const fetchVendorProfile = createAsyncThunk(
  'vendor/fetchVendorProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/vendors/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch vendor profile.');
    }
  }
);

export const updateStoreDetails = createAsyncThunk(
  'vendor/updateStoreDetails',
  async (storeData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/vendors/store-setup', storeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update store details.');
    }
  }
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    storeInfo: null,
    stats: { totalSales: 0, totalOrders: 0, activeProducts: 0 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.storeInfo = action.payload.storeInfo;
        state.stats = action.payload.stats || state.stats;
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStoreDetails.fulfilled, (state, action) => {
        state.storeInfo = action.payload.data || action.payload;
      });
  },
});

export default vendorSlice.reducer;