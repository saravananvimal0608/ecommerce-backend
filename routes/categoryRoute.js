import express from 'express'
import { addCategory, getAllCategory, updateCategory, singleCategory, deleteCategory } from '../controller/categoryController.js'
import upload from '../middleware/upload.js'
import { isAdmin } from '../middleware/adminMiddleware.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/add/category', authMiddleware, isAdmin, upload.single("image"), addCategory)
router.get('/getallcategory', getAllCategory)
router.put('/update/:id', upload.single("image"), updateCategory)
router.get('/:id', singleCategory)
router.delete('/:id', deleteCategory)

export default router 