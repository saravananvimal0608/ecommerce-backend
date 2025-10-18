import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "category",
      required: [true, "Category is required"],
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
      required: [true, "Product image is required"],
    },

    brand: {
      type: String,
    },

    ratings: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true } 
)

export default mongoose.model("Product", productSchema)
