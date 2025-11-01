import express from "express"
import { register, login, deleteUser, updateUser, getAllUser, getSingleUser, uploadProfileImage } from '../controller/userController.js'
import upload from '../middleware/upload.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/delete/:id', deleteUser)
router.put('/updateimage', authMiddleware, upload.single("image"), uploadProfileImage)
router.put("/update/:id", updateUser)
router.get('/', getAllUser)
router.get('/getsingleuser/:id', getSingleUser)

export default router