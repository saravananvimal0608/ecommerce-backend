import Category from '../model/categoryModel.js'

export const addCategory = async (req, res) => {
    try {
        const { name } = req.body
        const image = req.file ? req.file.filename : null;

        if (!name) {
            return res.status(400).json({
                status: false,
                message: "all field required"
            })
        }
        const existingCategory = await Category.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
        
        if (existingCategory) {
            return res.status(409).json({
                status: false,
                message: "Category name already exists"
            });
        }

        const newCategory = await Category.create({ name, image })
        return res.status(201).json({
            status: true,
            message: "category added",
            data: newCategory
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

export const getAllCategory = async (req, res) => {
    try {
        const AllCategory = await Category.find()
        return res.status(200).json({
            status: true,
            message: "fetched all category",
            data: AllCategory
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

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ status: false, message: "Category not found" });
        }

        const name = req.body ? req.body.name : undefined;
        const image = req.file ? req.file.filename : undefined;

        const updatedData = {};
        if (name) updatedData.name = name;
        if (image) updatedData.image = image;

        const category = await Category.findByIdAndUpdate(id, updatedData, { new: true });
        if (!category) return res.status(404).json({ status: false, message: "Category not found" });

        return res.status(200).json({ status: true, message: "Category updated successfully", data: category });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
            stack: error.stack
        });
    }
};

export const singleCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).json({ status: false, message: "Category not found" });
        }
        return res.status(200).json({ status: true, message: "category fetched successfully", data: category });
    } catch (error) {
        return res.status(500).json({ status: false, message: "internal server error", error: error.message, stack: error.stack });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const dlt = await Category.findByIdAndDelete(id)
        if (!dlt) {
            return res.status(404).json({ status: false, message: "Category not found" });
        }
        return res.status(200).json({ status: true, message: "Category deleted" });

    } catch (error) {
        return res.status(500).json({ status: false, message: "internal server error", error: error.message, stack: error.stack });
    }
}
