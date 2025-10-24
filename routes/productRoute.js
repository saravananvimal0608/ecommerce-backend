import express from 'express'
import { addProduct, getAllProducts, getProductByCategory, updateProduct, deleteProduct, searchProducts, getSingleProduct } from '../controller/productController.js'
import upload from '../middleware/upload.js'

const router = express.Router()

router.post('/', upload.single("image"), addProduct)
router.get('/', getAllProducts)
router.get('/search', searchProducts)
router.get('/singleproduct/:productId', getSingleProduct)
router.get('/:categoryId', getProductByCategory)
router.put('/:productId', upload.single("image"), updateProduct)
router.delete('/:productId', deleteProduct)


export default router