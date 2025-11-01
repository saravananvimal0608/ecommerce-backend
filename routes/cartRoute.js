import { addToCart, getCartByUserId, removeFromCart, updateCartQuantity, clearCart } from '../controller/cartController.js'
import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCartByUserId);
router.put("/update", authMiddleware, updateCartQuantity);
router.delete("/remove", authMiddleware, removeFromCart);
router.delete("/clear", authMiddleware, clearCart);

export default router