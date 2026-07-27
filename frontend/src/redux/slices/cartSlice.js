import { createSlice } from '@reduxjs/toolkit';

const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: savedCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedVariant = null } = action.payload;
      const cartKey = `${product._id}-${selectedVariant?.id || 'default'}`;
      const existingIndex = state.cartItems.findIndex((item) => item.cartKey === cartKey);

      if (existingIndex > -1) {
        state.cartItems[existingIndex].quantity += quantity;
      } else {
        state.cartItems.push({
          ...product,
          quantity,
          selectedVariant,
          cartKey,
        });
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.cartKey !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { cartKey, quantity } = action.payload;
      if (quantity <= 0) {
        state.cartItems = state.cartItems.filter((item) => item.cartKey !== cartKey);
      } else {
        const item = state.cartItems.find((i) => i.cartKey === cartKey);
        if (item) item.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;