import express from 'express'
import { addProduct, getAllProducts, getProductByCategory, updateProduct, deleteProduct, searchProducts, getSingleProduct } from '../controller/productController.js'
import upload from '../middleware/upload.js'
import { isAdmin } from '../middleware/adminMiddleware.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, isAdmin, upload.single("image"), addProduct)
router.get('/', getAllProducts)
router.get('/search', authMiddleware, searchProducts)
router.get('/singleproduct/:productId', authMiddleware, getSingleProduct)
router.get('/:categoryId', authMiddleware, getProductByCategory)
router.put('/:productId', authMiddleware, isAdmin, upload.single("image"), updateProduct)
router.delete('/:productId', authMiddleware, isAdmin, deleteProduct)


export default router