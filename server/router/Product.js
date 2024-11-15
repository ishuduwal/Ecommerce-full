import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { AddProduct, DeleteProduct, EditProduct, GetProduct, RecommendProducts } from '../controller/Product.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../../client/');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', GetProduct);
router.post('/', AddProduct);
router.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({ message: 'File uploaded successfully' });
});
router.delete('/:id', DeleteProduct);
router.put('/:id', EditProduct);
router.get("/recommend/:id", RecommendProducts);


export default router;
