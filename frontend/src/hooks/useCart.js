// src/hooks/useCart.js
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../redux/slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.selectedVariant?.price || item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return {
    cartItems,
    cartCount,
    subtotal,
    addItem: (product, quantity = 1, selectedVariant = null) =>
      dispatch(addToCart({ product, quantity, selectedVariant })),
    removeItem: (cartKey) => dispatch(removeFromCart(cartKey)),
    changeQuantity: (cartKey, quantity) =>
      dispatch(updateQuantity({ cartKey, quantity })),
    resetCart: () => dispatch(clearCart()),
  };
};

export default useCart;