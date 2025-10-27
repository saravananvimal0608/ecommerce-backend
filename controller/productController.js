import Product from '../model/productModel.js'
import Category from '../model/categoryModel.js'
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, brand } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!name || !description || !price || !category || !stock || !brand || !image) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
            });
        }

        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(404).json({
                status: false,
                message: "Category not found",
            });
        }

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({
                status: false,
                message: "Product name already exists",
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category: existingCategory._id,
            stock,
            brand,
            image,
        });

        return res.status(201).json({
            status: true,
            message: "Product added successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find().populate("category", "name")
        if (!product) {
            res.status(404).json({
                status: false,
                message: "no product found",
            })
        }
        res.status(200).json({
            status: true,
            message: "fetched all products",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "internal server error",
            error: error.message,
            stack: error.stack
        })
    }
}
export const getProductByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const products = await Product.find({ category: categoryId })
            .populate("category", "name");
        if (!products) {
            return res.status(404).json({
                status: false,
                message: "no product ",
            });
        }
        return res.status(200).json({
            status: true,
            message: "category by product fetched ",
            count: products.length,
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
export const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const product = await Product.findById(productId).populate("category", "name")
        if (!product) {
            res.status(404).json({
                status: false,
                message: "product not found"
            })
        }
        res.status(200).json({
            status: true,
            message: "product fetched successfully",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "internal server error",
            error: error.message,
            stack: error.stack
        })
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const { name, description, price, category, stock, brand } = req.body
        const image = req.file ? req.file.filename : null

        const existingProduct = await Product.findById(productId)
        if (!existingProduct) {
            return res.status(404).json({
                status: false,
                message: "product not found",
            })
        }
        if (category) {
            const existingCategory = await Category.findById(category)
            if (!existingCategory) {
                return res.status(404).json({
                    status: false,
                    message: "Category not found. Please choose a valid category id.",
                })
            }
            existingProduct.category = category
        }
        if (name) existingProduct.name = name;
        if (description) existingProduct.description = description;
        if (price) existingProduct.price = price;
        if (stock) existingProduct.stock = stock;
        if (brand) existingProduct.brand = brand;
        if (image) existingProduct.image = image;

        const updateProduct = await existingProduct.save()

        return res.status(200).json({
            status: true,
            message: "product updated succesfully.",
            data: updateProduct
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "internal server error",
            error: error.message,
            stack: error.stack
        })
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                status: false,
                message: "Invalid product ID format",
            });
        }

        const deleteProduct = await Product.findByIdAndDelete(productId)
        console.log(deleteProduct);

        if (!deleteProduct) {
            res.status(404).json({
                status: false,
                message: "product not found",
            })
        }
        res.status(200).json({
            status: true,
            message: "product deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "internal server error",
            error: error.message,
            stack: error.stack
        })
    }
}

export const searchProducts = async (req, res) => {
    try {
        const { q } = req.query;
        let filter = {};
        if (q) {
            filter.name = { $regex: q, $options: "i" };
        }

        const products = await Product.find(filter);

        res.status(200).json({
            status: true,
            message: "Products fetched successfully",
            data: products,

        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error",
            error: error.message
        });
    }
};


