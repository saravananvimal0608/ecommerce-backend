import express from 'express'
import { updateAddress, getSingleAddress, addAddress, getUserAddresses, deleteAddress } from '../controller/addressController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, addAddress)
router.get('/', authMiddleware, getUserAddresses)
router.get('/:id', authMiddleware, getSingleAddress)
router.put('/:id', authMiddleware, updateAddress)
router.delete('/:id', authMiddleware, deleteAddress)

export default router