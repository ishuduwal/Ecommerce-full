import Product from "../model/Product.js";
import mongoose from "mongoose";

export const GetProduct = async (req, res) => {
    try {
        const product = await Product.find()
        res.status(200).json(product)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const AddProduct = async (req, res) => {
    const { title, description, price, image, category } = req.body
    try {
        let product = await Product.findOne({ title: title })
        if (product) { res.status(200).json({ message: "Product is already added" }) }
        else {
            const newProduct = new Product({
                title, description, price, image, category
            })
            await newProduct.save()
            res.status(201).json({ message: "New product added" })
        }
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

export const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Product id is missing' })
        }
        const product = await Product.findOneAndDelete({ _id: id });
        if (!product) {
            return res.status(404).json({ message: 'product not found' })
        }
        res.status(200).json({ message: 'product deleted sucessfully' })
    } catch (error) {
        console.error('error deleting product', error);
        res.status(500).json({ message: 'error deleting product', error: error.message })
    }
}

export const EditProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, image, category } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Product id is missing or invalid' })
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, description, price, image, category },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'product not found' })
        }
        res.status(200).json({ message: 'product updated sucessfully', product: updatedProduct });
    } catch (error) {
        console.error('error updating product:', error)
        res.status(500).json({ message: 'error updating product', error: error.message })
    }
}

export const RecommendProducts = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const targetProduct = await Product.findById(id);
        if (!targetProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const products = await Product.find({ _id: { $ne: id } });

        const calculateSimilarityScore = (product) => {
            const categorySimilarity = targetProduct.category === product.category ? 1 : 0;

            const targetWords = new Set(targetProduct.description.toLowerCase().split(/\s+/));
            const productWords = new Set(product.description.toLowerCase().split(/\s+/));
            const sharedWords = [...targetWords].filter(word => productWords.has(word)).length;

            return sharedWords + categorySimilarity;
        };
        const recommendations = products.map(product => {
            const score = calculateSimilarityScore(product);
            return { product, score };
        });

        recommendations.sort((a, b) => b.score - a.score);

        res.status(200).json({
            message: "Recommendations generated successfully",
            recommendations: recommendations.slice(0, 3).map(rec => rec.product),
        });
    } catch (error) {
        console.error("Error generating recommendations:", error);
        res.status(500).json({ message: "Error generating recommendations", error: error.message });
    }
};
