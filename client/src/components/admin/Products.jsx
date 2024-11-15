import React, { useState, useEffect } from 'react';
import { DeleteProduct, GetProduct, EditProduct } from '../function/Product';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await GetProduct();
            setProducts(fetchedProducts);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch products");
            setLoading(false);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            if (!productId) {
                console.error('Product ID is missing');
                return;
            }
            await DeleteProduct(productId);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditProductClick = (product) => {
        setIsEditing(true);
        setEditingProduct({ ...product });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSaveProduct = async () => {
        try {
            await EditProduct(editingProduct);
            setIsEditing(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingProduct(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-5 bg-white rounded-lg shadow max-lg:flex justify-center items-center flex-col">
            <h2 className="text-2xl font-bold mb-5">Plant List</h2>
            <div className="hidden lg:block">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Plant Name</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className='py-2 px-4 border-b'>Category</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                <td className="py-2 px-4 border-b text-center">{product.title}</td>
                                <td className="py-2 px-4 border-b text-center">Rs.{product.price}</td>
                                <td className='py-2 px-4 border-b text-center'>{product.category}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button
                                        onClick={() => handleEditProductClick(product)}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isEditing && (
                <div className="p-5 mt-5 fixed inset-0 bg-white bg-opacity-95  rounded-lg shadow-lg max-w-md mx-auto h-[28rem]">
                    <h3 className="text-lg font-bold mb-4">Edit Product</h3>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={editingProduct.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={editingProduct.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Price</label>
                        <input
                            type="text"
                            name="price"
                            value={editingProduct.price}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Category</label>
                        <select className="w-full p-2 border" name="category" value={editingProduct.category} onChange={handleInputChange}>
                            <option>Indoor</option>
                            <option>Outdoor</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={handleSaveProduct}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
