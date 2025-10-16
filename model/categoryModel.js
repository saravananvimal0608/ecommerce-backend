import mongoose from 'mongoose'

const categoryModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
})
export default mongoose.model("category", categoryModel)