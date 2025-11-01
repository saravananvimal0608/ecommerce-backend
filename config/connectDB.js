import mongoose from 'mongoose'

const connectDB = async () => {
    const MONGO_URL = process.env.MONGO_URL
    try {
        const conn = await mongoose.connect(MONGO_URL)
        console.log("mongo connected successfully");
    } catch (error) {
        console.log("mongo not connected", error.stack);
    }
}
export default connectDB;