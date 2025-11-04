import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    addressLine1: {
        type: String,
    },
    addressLine2: String,
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: String,
    },
    country: {
        type: String,
        default: "India",
    },
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);

export default Address;
