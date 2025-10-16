import express from "express"
import { register, login, deleteUser, updateUser, getAllUser } from '../controller/userController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.delete('/delete/:id', deleteUser)
router.put("/update/:id", updateUser)
router.get('/', getAllUser)

export default router