import multer from 'multer'
import path from 'path'

// creating a storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    // creating a unique name 
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())

    if (extname) {
        cb(null, true)
    }
    else {
        cb("only images are allowed")
    }
};
const upload = multer({
    storage,
    fileFilter
})

export default upload;