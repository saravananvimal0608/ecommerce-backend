import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export const login = async (req, res) => {
    try {
        const { email, password, number } = req.body

        if (!email || !password, number) {
            return res.status(400).json({
                status: false,
                message: "please enter all fields"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "please enter valid email"
            })
        }
        // comparing password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(404).json({
                status: false,
                message: "incorrect password"
            })
        }
        // json webtoken
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" })

        return res.status(200).json({
            status: true,
            message: 'successfully login',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                number: user.number,
                isAdmin: user.isAdmin,
                token
            },
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "internal server error",
            error: error.message
        })
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password, number } = req.body
        if (!email || !password || !name || !number) {
            return res.status(400).json({
                status: false,
                message: "please enter all fields"
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(404).json({
                status: false,
                message: "email id already exist",
            })
        }
        // hashed password
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)

        // creating and saved user in mongo
        const newUser = await User.create({
            name,
            email,
            number,
            password: hashedPassword,
        })
        // sending a data without password
        const { password: pwd, ...userWithoutPassword } = newUser._doc

        return res.status(201).json({
            status: true,
            message: 'user register successfully',
            data: userWithoutPassword
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "internal server error",
            error: error.message,
        })
    }
}

export const uploadProfileImage = async (req, res) => {
    try {
        // user id coming from authmiddleware
        const userId = req.user.id;
        const image = req.file ?  req.file?.path : null;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        if (image && user.profileImage) {
            const oldImagePath = path.join("upload", user.profileImage);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Save new image
        if (image) user.profileImage = image;

        await user.save();

        return res.status(200).json({
            status: true,
            message: "Profile image uploaded successfully",
            profileImage: user.profileImage,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({
                status: false,
                message: "id required",
            })
        }
        const dlt = await User.findByIdAndDelete(id)

        console.log(dlt);
        return res.status(200).json({
            status: true,
            message: "user deleted successfully",
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

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password, number } = req.body

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "user not found"
            })
        }
        const mailId = await User.findOne({ email });
        if (mailId && mailId._id.toString() !== id) {
            return res.status(400).json({
                status: false,
                message: "Email ID already exists"
            });
        }

        if (name) {
            user.name = name
        }
        if (email) {
            user.email = email
        }
        if (number) {
            user.number = number
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword
        }

        const updateUser = await user.save()

        const { password: pwd, ...userWithoutPassword } = updateUser._doc

        return res.status(200).json({
            status: true,
            message: "user updated successfully",
            data: userWithoutPassword
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

export const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find()
        if (!allUser) {
            res.status(404).json({
                status: false,
                message: "no user found"
            })
        }
        res.status(200).json({
            status: true,
            message: "fetched all user",
            data: allUser
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
export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({
                status: false,
                message: "id not found"
            })
        }
        const data = await User.findById(id)
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "ID not provided"
            });
        }
        return res.status(200).json({
            status: true,
            message: "user fetched successfully",
            data: data
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