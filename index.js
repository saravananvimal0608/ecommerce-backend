import express from 'express'
import connectDB from "./config/connectDB.js"
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import cors from 'cors'
import productRoute from "./routes/productRoute.js"
import cartRoute from './routes/cartRoute.js'
import addressRoute from './routes/addressRoute.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/user', userRoute)
app.use('/category', categoryRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)
app.use('/address', addressRoute)
app.use("/upload", express.static("upload"));
app.get("/", (req, res) => {
    res.send("express working")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)
)
