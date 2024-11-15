import React, { useState } from 'react';
import { AddProduct, UploadProduct } from '../function/Product';

export const ProductAdd = () => {
    const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', category: 'Indoor' });
    const [file, setFile] = useState(null);

    const ImageHandler = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setNewProduct(prev => ({ ...prev, image: file.name }));
        console.log(e.target.files[0].name)
    }

    const handleAddProduct = async () => {
        try {
            await AddProduct(newProduct);
            if (file) {
                const formData = new FormData();
                formData.append('product', file);
                await UploadProduct(formData);
            }
            setNewProduct({ title: '', description: '', price: '' });
            setFile(null);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="p-5 bg-white shadow max-w-3xl mx-auto max-lg:mt-32 max-lg:w-96">
            <h2 className="text-2xl font-bold mb-5">Add Plants</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <input type="file" className=" file:py-2 file:px-2  cursor-pointer" onChange={(e) => ImageHandler(e)} />
                    </div>
                    <div>
                        <label className="block font-semibold">Product Name:</label>
                        <input type="text" placeholder='product name' className="w-full p-2 border" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                    </div>
                    <div>
                        <label>Category</label>
                        <select className="w-full p-2 border" name="category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                            <option>Indoor</option>
                            <option>Outdoor</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold">Price:</label>
                        <input type="number" placeholder="price" className="w-full p-2 border" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                    </div>
                    <div>
                        <label className="block font-semibold">Description:</label>
                        <textarea placeholder="About Plants" className="w-full h-32 p-2 border" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}></textarea>
                    </div>
                    <div className="text-right">
                        <button className="bg-purple-700 text-white px-4 py-2  hover:bg-purple-900" onClick={handleAddProduct}>Add New Plant</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
