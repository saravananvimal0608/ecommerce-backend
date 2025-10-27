import express from 'express'
import { addCategory, getAllCategory, updateCategory, singleCategory, deleteCategory } from '../controller/categoryController.js'
import upload from '../middleware/upload.js'

const router = express.Router()

router.post('/add/category', upload.single("image"), addCategory)
router.get('/getallcategory', getAllCategory)
router.put('/update/:id', upload.single("image"), updateCategory)
router.get('/:id', singleCategory)
router.delete('/:id', deleteCategory)

export default router 