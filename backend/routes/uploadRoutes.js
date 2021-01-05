import express from 'express'
import path from 'path'
import multer from 'multer'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

function fileFilter(req, file, cb) {
    const fileType = file.originalname.split('.').slice(-1)[0]
    if (fileType === 'jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage });

router.route('/').post(protect, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})



export default router