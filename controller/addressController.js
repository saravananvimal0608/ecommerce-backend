import Address from "../model/addressModel.js";

export const addAddress = async (req, res) => {
    try {
        const userId = req.user.id; // from authMiddleware
        const { addressLine1, addressLine2, city, state, pincode, country } = req.body;

        if (!addressLine1 || !city || !state || !pincode) {
            return res.status(400).json({
                status: false,
                message: "Please fill all required fields",
            });
        }

        const newAddress = await Address.create({
            userId,
            addressLine1,
            addressLine2,
            city,
            state,
            pincode,
            country,
        });

        return res.status(201).json({
            status: true,
            message: "Address added successfully",
            data: newAddress,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getUserAddresses = async (req, res) => {
    try {
        const userId = req.user.id;
        const addresses = await Address.find({ userId });

        if (!addresses.length) {
            return res.status(404).json({
                status: false,
                message: "No addresses found for this user",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Fetched user addresses successfully",
            data: addresses,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getSingleAddress = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Address ID required",
            });
        }

        const address = await Address.findById(id);
        if (!address) {
            return res.status(404).json({
                status: false,
                message: "Address not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Fetched single address successfully",
            data: address,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { addressLine1, addressLine2, city, state, pincode, country } = req.body;

        const address = await Address.findById(id);
        if (!address) {
            return res.status(404).json({
                status: false,
                message: "Address not found",
            });
        }

        if (address.userId.toString() !== req.user.id) {
            return res.status(403).json({
                status: false,
                message: "Unauthorized to update this address",
            });
        }

        if (addressLine1) address.addressLine1 = addressLine1;
        if (addressLine2) address.addressLine2 = addressLine2;
        if (city) address.city = city;
        if (state) address.state = state;
        if (pincode) address.pincode = pincode;
        if (country) address.country = country;

        const updated = await address.save();

        return res.status(200).json({
            status: true,
            message: "Address updated successfully",
            data: updated,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; 

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Address ID is required",
            });
        }

        const address = await Address.findOne({ _id: id, userId });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found or not authorized to delete",
            });
        }

        await Address.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    } catch (error) {
        console.error("Delete Address Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while deleting address",
        });
    }
};


