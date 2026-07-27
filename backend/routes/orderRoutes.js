import express from 'express';
import { createOrder, getOrderById, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { createOrderValidation } from '../validators/orderValidator.js';

const router = express.Router();

router.use(protect); // All order endpoints require auth

router.post('/', createOrderValidation, createOrder);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrderById);

export default router;