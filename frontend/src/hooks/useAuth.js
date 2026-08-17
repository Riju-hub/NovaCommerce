
// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import {
  loginUser,
  registerUser,
  verifyOtpUser, // <--- Import verifyOtpUser
  updateProfile,
  logout,
  clearError,
} from '../redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,
    login: (credentials) => dispatch(loginUser(credentials)),
    register: (userData) => dispatch(registerUser(userData)),
    verifyOtp: (otpData) => dispatch(verifyOtpUser(otpData)), // <--- Export verifyOtp here
    updateUserProfile: (profileData) => dispatch(updateProfile(profileData)),
    logoutUser: () => dispatch(logout()),
    clearAuthError: () => dispatch(clearError()),
  };
};

export default useAuth;