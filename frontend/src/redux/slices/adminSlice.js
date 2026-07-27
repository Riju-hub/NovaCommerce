import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users.');
    }
  }
);

export const fetchPendingVendors = createAsyncThunk(
  'admin/fetchPendingVendors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/vendors/pending');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pending vendors.');
    }
  }
);

export const approveVendor = createAsyncThunk(
  'admin/approveVendor',
  async (vendorId, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/admin/vendors/${vendorId}/approve`);
      return vendorId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to approve vendor.');
    }
  }
);

export const toggleUserBlockStatus = createAsyncThunk(
  'admin/toggleUserBlockStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/users/${userId}/toggle-block`);
      return { userId, isBlocked: response.data.isBlocked };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user status.');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    pendingVendors: [],
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || action.payload?.users || [];
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPendingVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingVendors = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || action.payload?.vendors || [];
      })
      .addCase(fetchPendingVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(approveVendor.fulfilled, (state, action) => {
        state.pendingVendors = state.pendingVendors.filter(
          (v) => (v._id || v.id) !== action.payload
        );
      })

      .addCase(toggleUserBlockStatus.fulfilled, (state, action) => {
        const user = state.users.find(
          (u) => (u._id || u.id) === action.payload.userId
        );
        if (user) {
          user.isBlocked = action.payload.isBlocked;
        }
      });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;