import express from 'express'
import connectDB from "./config/connectDB.js"
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'

dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.use('/user', userRoute)
app.use('/category', categoryRoute)
app.use("/upload", express.static("upload"));
app.get("/", (req, res) => {
    res.send("express working")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)
)
