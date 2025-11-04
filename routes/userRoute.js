import express from "express"
import { register, login, deleteUser, updateUser, getAllUser, getSingleUser, uploadProfileImage } from '../controller/userController.js'
import upload from '../middleware/upload.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/delete/:id', authMiddleware, deleteUser)
router.put('/updateimage', authMiddleware, upload.single("image"), uploadProfileImage)
router.put("/update/:id", authMiddleware, updateUser)
router.get('/', getAllUser)
router.get('/getsingleuser/:id', authMiddleware, getSingleUser)

export default router